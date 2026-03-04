import type { OrgMember, OrgStats } from './admin';

// ── Generate CSV export string ──
export function generateCSVExport(members: OrgMember[], orgName: string): string {
  const TOTAL_LEVELS = 47;
  const headers = ['Name', 'Email', 'XP', 'Completion %', 'Department', 'Level', 'Last Active'];
  const rows = members.map((m) => {
    const name = m.profile.full_name || m.profile.username || m.profile.email;
    const levelsCompleted = Object.values(m.profile.completed_levels || {}).filter(Boolean).length;
    const completionPct = Math.round((levelsCompleted / TOTAL_LEVELS) * 100);
    const lastActive = m.profile.last_active
      ? new Date(m.profile.last_active).toLocaleDateString()
      : '';

    return [
      escapeCsvField(name),
      escapeCsvField(m.profile.email),
      String(m.profile.xp || 0),
      `${completionPct}%`,
      escapeCsvField(m.department || ''),
      String(m.profile.level || 1),
      lastActive,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// ── Trigger CSV download ──
export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ── Generate PDF report ──
export async function generatePDFReport(
  members: OrgMember[],
  stats: OrgStats,
  orgName: string
): Promise<void> {
  const { default: jsPDF } = await import('jspdf');
  const { default: autoTable } = await import('jspdf-autotable');

  const doc = new jsPDF();
  const TOTAL_LEVELS = 47;
  const now = new Date().toLocaleDateString();

  // Header
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235); // primary blue
  doc.text(`${orgName} - Team Report`, 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Generated on ${now}`, 14, 30);

  // Stats summary
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  const statsY = 42;
  doc.text(`Total Members: ${stats.totalMembers}`, 14, statsY);
  doc.text(`Total XP: ${stats.totalXp.toLocaleString()}`, 14, statsY + 7);
  doc.text(`Avg XP: ${stats.avgXp.toLocaleString()}`, 100, statsY);
  doc.text(`Avg Completion: ${stats.avgCompletionPercent}%`, 100, statsY + 7);
  doc.text(`Levels Completed: ${stats.totalLevelsCompleted}`, 14, statsY + 14);

  // Member table
  const tableData = members.map((m) => {
    const name = m.profile.full_name || m.profile.username || m.profile.email;
    const levelsCompleted = Object.values(m.profile.completed_levels || {}).filter(Boolean).length;
    const completionPct = Math.round((levelsCompleted / TOTAL_LEVELS) * 100);
    const lastActive = m.profile.last_active
      ? new Date(m.profile.last_active).toLocaleDateString()
      : '--';

    return [
      name,
      m.profile.email,
      String(m.profile.xp || 0),
      `${completionPct}%`,
      m.department || '--',
      String(m.profile.level || 1),
      lastActive,
    ];
  });

  autoTable(doc, {
    startY: statsY + 24,
    head: [['Name', 'Email', 'XP', 'Completion', 'Department', 'Level', 'Last Active']],
    body: tableData,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [241, 245, 249],
    },
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `OneWave Claude Academy - Page ${i} of ${pageCount}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }

  doc.save(`${orgName.replace(/\s+/g, '-').toLowerCase()}-report-${now.replace(/\//g, '-')}.pdf`);
}
