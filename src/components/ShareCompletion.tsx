"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, ImageIcon, Download } from "lucide-react";
import { BRAND } from "@/config/brand";
import { useProgress } from "@/context/ProgressContext";

type Upload = { id: string; url: string; file: File };

export default function ShareCompletion() {
  const { character, completedLevels, xp } = useProgress();
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [caption, setCaption] = useState(
    `I just completed Level ${completedLevels.slice(-1)[0] ?? 0} of the ${BRAND.name}! #${
      BRAND.hashtags[0]
    } by @${BRAND.twitterHandle} — built my first micro-app\n\nTry it: ${BRAND.siteUrl}`
  );
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploads, caption, character, completedLevels, xp]);

  function onFiles(files: FileList | null) {
    if (!files) return;
    const list = Array.from(files);
    list.forEach(async (file) => {
      const url = URL.createObjectURL(file);
      setUploads((u) => [...u, { id: crypto.randomUUID(), url, file }]);
    });
  }

  async function drawCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = 1200);
    const h = (canvas.height = 630);

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#0b0b15");
    grad.addColorStop(1, "#2b0b4f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Title
    ctx.fillStyle = "#fff";
    ctx.font = "bold 48px system-ui, -apple-system, Segoe UI";
    ctx.fillText("Claude Academy Milestone", 40, 90);

    ctx.font = "400 28px system-ui, -apple-system, Segoe UI";
    const latest = completedLevels.slice(-1)[0] ?? 0;
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`Completed Level ${latest}  •  XP ${xp}`, 40, 140);

    // Screenshot preview (first image)
    if (uploads[0]) {
      const img = await loadImage(uploads[0].url);
      const imgW = 520;
      const imgH = (img.height / img.width) * imgW;
      ctx.drawImage(img, 40, 180, imgW, Math.min(360, imgH));
    } else {
      // Placeholder box
      ctx.fillStyle = "#111827";
      roundRect(ctx, 40, 180, 520, 360, 20);
      ctx.fill();
      ctx.fillStyle = "#475569";
      ctx.font = "500 22px system-ui";
      ctx.fillText("Your screenshot here", 200, 365);
    }

    // Caption snippet
    ctx.fillStyle = "#fff";
    ctx.font = "600 32px system-ui";
    ctx.fillText("What I built", 600, 220);
    ctx.fillStyle = "#cbd5e1";
    wrapText(ctx, caption, 600, 260, 560, 30);

    // Branding footer
    ctx.fillStyle = "#DA7756";
    ctx.font = "600 22px system-ui";
    ctx.fillText(`@${BRAND.twitterHandle}  •  ${BRAND.siteUrl}`, 40, h - 40);
  }

  function downloadCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "claude-academy-share.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  const tweetUrl = () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&hashtags=${encodeURIComponent(
      BRAND.hashtags.join(",")
    )}`;

  const linkedInUrl = () =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(BRAND.siteUrl)}`;

  async function copyCaption() {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Share Your Completion</h1>
        <p className="text-gray-300 mb-8">Post your win, tag us, and inspire others.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">1) Add screenshots</h2>
            <label className="block border border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:bg-white/5">
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-8 h-8 text-purple-400" />
                <span className="text-sm text-gray-300">Click to upload one or more screenshots</span>
              </div>
            </label>
            {uploads.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {uploads.map((u) => (
                  <img key={u.id} src={u.url} alt="Upload" className="w-full h-24 object-cover rounded-md border border-white/10" />
                ))}
              </div>
            )}
          </div>

          <div className="glass rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">2) Craft your caption</h2>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full h-40 bg-black/40 rounded-lg border border-white/10 p-3 outline-none focus:ring-2 focus:ring-purple-600"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a className="btn-primary" href={tweetUrl()} target="_blank" rel="noreferrer">Tweet it</a>
              <a className="btn-secondary" href={linkedInUrl()} target="_blank" rel="noreferrer">Share on LinkedIn</a>
              <button className="btn-secondary" onClick={copyCaption}>
                <Copy className="w-4 h-4 inline mr-1" /> {copied ? "Copied!" : "Copy caption (TikTok)"}
              </button>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-5 mt-6">
          <h2 className="text-xl font-semibold mb-4">3) Download a share image</h2>
          <div className="flex items-start gap-6">
            <canvas ref={canvasRef} className="rounded-lg border border-white/10 w-full max-w-[720px]" />
            <div className="min-w-48">
              <button className="btn-primary w-full" onClick={downloadCard}>
                <Download className="w-4 h-4 inline mr-1" /> Download PNG
              </button>
              <p className="text-xs text-gray-400 mt-3">Use this for X/LinkedIn. For TikTok, paste the caption and attach your screen recording.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

