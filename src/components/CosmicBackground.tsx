import React, { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Subtle space star particles
    const stars: {
      x: number;
      y: number;
      size: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    }[] = [];

    const numStars = Math.min(120, Math.floor((width * height) / 12000));
    const starColors = [
      "rgba(255, 255, 255, ",
      "rgba(0, 255, 209, ",   // Accent cyan glow
      "rgba(255, 128, 227, ", // Nebula pink touch
      "rgba(168, 85, 247, "  // Cosmic purple warmth
    ];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        twinkleSpeed: 0.003 + Math.random() * 0.012,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        // Continuous organic twinkling
        star.twinklePhase += star.twinkleSpeed;
        const opacity = 0.15 + Math.abs(Math.sin(star.twinklePhase)) * 0.75;
        
        ctx.fillStyle = `${star.color}${opacity.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Very slow spatial drift for vertical movement illusion
        star.y -= 0.04;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Deep Space Nebula Foundation */}
      <div 
        className="absolute inset-0 bg-[#020205]" 
        style={{
          background: "radial-gradient(ellipse at 50% 15%, #0b0c15 0%, #040408 55%, #010103 100%)"
        }}
      />
      
      {/* Super faint space gas dust cloud gradients */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 15% 20%, rgba(0, 255, 209, 0.04) 0%, transparent 50%)"
        }}
      />
      <div 
        className="absolute inset-0 opacity-15 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 85% 70%, rgba(255, 128, 227, 0.04) 0%, transparent 60%)"
        }}
      />
      <div 
        className="absolute inset-0 opacity-10 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.03) 0%, transparent 45%)"
        }}
      />

      {/* Twinkly stars canvas overlay */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-55 mix-blend-screen"
      />
    </div>
  );
}
