export function getTestEmails(): string[] {
  const raw = process.env.NEXT_PUBLIC_TEST_EMAILS || 'gabe@onewave-ai.com,gked21@gmail.com';
  return raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
}

