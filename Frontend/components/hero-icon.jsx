"use client";

import { useEffect, useRef } from "react";
import { Receipt } from "lucide-react";

export function HeroIcon() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Make canvas responsive
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      const size = Math.min(container.offsetWidth, 400);
      canvas.width = size;
      canvas.height = size;
    };

    // Initial size
    updateCanvasSize();

    // Update on resize
    window.addEventListener("resize", updateCanvasSize);

    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width * 0.2; // Responsive radius

    // Animation variables
    let rotation = 0;
    const hue = 210; // Blue hue
    let scale = 1;
    let scaleDirection = 0.005;

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update animation values
      rotation += 0.01;
      scale += scaleDirection;
      if (scale > 1.1 || scale < 0.9) {
        scaleDirection *= -1;
      }

      // Draw outer circle with glow
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.8,
        centerX,
        centerY,
        radius * 1.5
      );
      gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.4)`);
      gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();

      // Draw rotating particles
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + rotation;
        const x = centerX + Math.cos(angle) * radius * 1.3;
        const y = centerY + Math.sin(angle) * radius * 1.3;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, canvas.width * 0.01, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${
          0.3 + 0.7 * Math.sin(rotation * 2 + i)
        })`;
        ctx.fill();
        ctx.restore();
      }

      // Draw inner circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * scale, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 80%, 95%, 1)`;
      ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.6)`;
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.restore();

      // Request next frame
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-[300px] md:max-w-[400px] mx-auto">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 rounded-full bg-white p-4 md:p-6 shadow-lg dark:bg-gray-800">
        <Receipt className="h-12 w-12 md:h-16 md:w-16 text-primary" />
      </div>
    </div>
  );
}
