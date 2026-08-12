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

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      canvas!.width = parent.offsetWidth;
      canvas!.height = parent.offsetHeight;
    }
    resize();

    let width = canvas.width;
    let height = canvas.height;

    const NUM_POINTS = 28;
    const points = Array.from({ length: NUM_POINTS }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      icon: Math.random() < 0.5 ? ICONS[i % ICONS.length] : null,
    }));

    let frameId: number;

    function draw() {
      width = canvas!.width;
      height = canvas!.height;
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
          if (dist < 200) {
            ctx!.strokeStyle = `rgba(101, 163, 13, ${0.9 - dist / 200})`;
            ctx!.lineWidth = 1.3;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of points) {
        if (p.icon) {
          ctx!.font = "22px sans-serif";
          ctx!.textAlign = "center";
          ctx!.textBaseline = "middle";
          ctx!.fillText(p.icon, p.x, p.y);
        } else {
          ctx!.fillStyle = "rgba(23, 23, 23, 0.7)";
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      frameId = requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
