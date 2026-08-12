"use client";

import { useEffect, useRef } from "react";

const ICONS = ["📱", "⌚", "🎧", "💡", "🔌", "👤", "📡", "🏠"];

export default function ConnectionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const NUM_POINTS = 22;
    const points = Array.from({ length: NUM_POINTS }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      icon: Math.random() < 0.45 ? ICONS[i % ICONS.length] : null,
    }));

    let frameId: number;

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 20 || p.x > width - 20) p.vx *= -1;
        if (p.y < 20 || p.y > height - 20) p.vy *= -1;
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 160) {
            ctx!.strokeStyle = `rgba(132, 204, 22, ${1 - dist / 160})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of points) {
        if (p.icon) {
          ctx!.font = "18px sans-serif";
          ctx!.textAlign = "center";
          ctx!.textBaseline = "middle";
          ctx!.globalAlpha = 0.85;
          ctx!.fillText(p.icon, p.x, p.y);
          ctx!.globalAlpha = 1;
        } else {
          ctx!.fillStyle = "rgba(23, 23, 23, 0.55)";
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      frameId = requestAnimationFrame(draw);
    }

    draw();

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
    />
  );
}
