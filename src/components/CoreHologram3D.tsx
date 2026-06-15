import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { 
  Rotate3d, 
  Activity, 
  Palette, 
  Zap, 
  Layers, 
  Maximize2,
  Cpu,
  Monitor,
  Workflow
} from "lucide-react";

type ColorScheme = {
  name: string;
  primary: string;
  hex: string;
  glow: string;
};

const SCHEMES: ColorScheme[] = [
  { name: "Cyber Cyan", primary: "#00FFD1", hex: "0x00FFD1", glow: "rgba(0, 255, 209, 0.4)" },
  { name: "Solar Amber", primary: "#FFB000", hex: "0xFFB000", glow: "rgba(255, 176, 0, 0.4)" },
  { name: "Nova Violet", primary: "#A855F7", hex: "0xA855F7", glow: "rgba(168, 85, 247, 0.4)" },
  { name: "Matrix Emerald", primary: "#10B981", hex: "0x10B981", glow: "rgba(16, 185, 129, 0.4)" }
];

export default function CoreHologram3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeScheme, setActiveScheme] = useState<ColorScheme>(SCHEMES[0]);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [meshStyle, setMeshStyle] = useState<"wireframe" | "particle_cloud" | "solid" | "quantum_ring">("wireframe");
  const [explosionDim, setExplosionDim] = useState<number>(0); // 0 (packed) to 1.5 (expanded)
  const [scaleFactor, setScaleFactor] = useState<number>(1);
  const [showScanline, setShowScanline] = useState<boolean>(true);
  
  // Real-time metrics states
  const metricsRef = useRef({
    fps: 60,
    theta: 0,
    vertices: 2420,
    polygons: 4800,
    gpuTemp: 42
  });

  // Keep speed in a ref to avoid recreating the animation loop
  const settingsRef = useRef({
    speed: rotationSpeed,
    scheme: activeScheme,
    style: meshStyle,
    explosion: explosionDim,
    scale: scaleFactor
  });

  useEffect(() => {
    settingsRef.current = {
      speed: rotationSpeed,
      scheme: activeScheme,
      style: meshStyle,
      explosion: explosionDim,
      scale: scaleFactor
    };
  }, [rotationSpeed, activeScheme, meshStyle, explosionDim, scaleFactor]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Sizing handling
    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight || 350;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Light sources
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(parseInt(activeScheme.hex), 12, 30);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const coreLight = new THREE.PointLight(parseInt(activeScheme.hex), 8, 10);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Top and bottom guide lights
    const blueLight = new THREE.DirectionalLight(0x0055ff, 1.5);
    blueLight.position.set(0, 5, 0);
    scene.add(blueLight);

    // Core interactive container group
    const parentGroup = new THREE.Group();
    scene.add(parentGroup);

    // Let's create layered modular meshes for high tech visual feedback
    // Layer 1: Core Icosahedron structure
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: parseInt(activeScheme.hex),
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      shininess: 100
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    parentGroup.add(coreMesh);

    // Layer 2: Orbiting Outer Ring Shield
    const ringGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x555555,
      transparent: true,
      opacity: 0.6,
      wireframe: true
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 2;
    parentGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 4;
    parentGroup.add(ringMesh2);

    // Layer 3: High Density Swirling Quantum Star-field
    const starsCount = 1200;
    const starsGeo = new THREE.BufferGeometry();
    const starsPos = new Float32Array(starsCount * 3);
    const starSpeeds = new Float32Array(starsCount);
    const starRadii = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      const radius = 1.3 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starsPos[i * 3] = radius * Math.sin(phi) * Math.cos(angle);
      starsPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(angle);
      starsPos[i * 3 + 2] = radius * Math.cos(phi);

      starSpeeds[i] = 0.5 + Math.random() * 1.5;
      starRadii[i] = radius;
    }

    starsGeo.setAttribute("position", new THREE.BufferAttribute(starsPos, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 0.035,
      color: parseInt(activeScheme.hex),
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true
    });
    const starPoints = new THREE.Points(starsGeo, starsMat);
    parentGroup.add(starPoints);

    // Track dragging actions
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0.3;
    let targetRotationY = 0.5;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Mobile touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.009;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frames = 0;
    let frameTimer = 0;

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // FPS tracking
      frames++;
      frameTimer += delta;
      if (frameTimer >= 0.5) {
        metricsRef.current = {
          ...metricsRef.current,
          fps: Math.round(frames / frameTimer),
          theta: parseFloat(parentGroup.rotation.y.toFixed(2)),
          gpuTemp: Math.round(41 + Math.sin(time / 1000) * 1.5 + (settingsRef.current.speed * 1.5))
        };
        frames = 0;
        frameTimer = 0;
      }

      // Sync settings from React States
      const currentSpeed = settingsRef.current.speed * 0.25;
      const currentHex = parseInt(settingsRef.current.scheme.hex);
      const currentStyle = settingsRef.current.style;
      const currentExplosion = settingsRef.current.explosion;
      const currentScale = settingsRef.current.scale;

      // Update light signals
      pointLight.color.setHex(currentHex);
      coreLight.color.setHex(currentHex);

      // Materials updates
      if (coreMat.color.getHex() !== currentHex) {
        coreMat.color.setHex(currentHex);
        starsMat.color.setHex(currentHex);
      }

      // Interactive styles logic
      if (currentStyle === "wireframe") {
        coreMesh.visible = true;
        coreMat.wireframe = true;
        coreMat.opacity = 0.85;
        starPoints.visible = true;
        ringMesh1.visible = true;
        ringMesh2.visible = true;
      } else if (currentStyle === "particle_cloud") {
        coreMesh.visible = false;
        starPoints.visible = true;
        ringMesh1.visible = false;
        ringMesh2.visible = false;
      } else if (currentStyle === "solid") {
        coreMesh.visible = true;
        coreMat.wireframe = false;
        coreMat.opacity = 0.45;
        starPoints.visible = true;
        ringMesh1.visible = true;
        ringMesh2.visible = true;
      } else if (currentStyle === "quantum_ring") {
        coreMesh.visible = false;
        starPoints.visible = false;
        ringMesh1.visible = true;
        ringMesh2.visible = true;
        ringMesh1.scale.set(1.2, 1.2, 1.2);
        ringMesh2.scale.set(1.2, 1.2, 1.2);
      }

      // Explosion dimension decompress mechanics
      // Outer layers separate from core
      ringMesh1.scale.set(1 + currentExplosion, 1 + currentExplosion, 1 + currentExplosion);
      ringMesh2.scale.set(1 + currentExplosion, 1 + currentExplosion, 1 + currentExplosion);
      
      // Global Model Scaling
      parentGroup.scale.set(currentScale, currentScale, currentScale);

      // Smooth decay of dragging inertias
      parentGroup.rotation.y += (targetRotationY - parentGroup.rotation.y) * 0.1;
      parentGroup.rotation.x += (targetRotationX - parentGroup.rotation.x) * 0.1;

      // Autonomous orbital idle spinning
      if (!isDragging) {
        targetRotationY += currentSpeed * delta;
        targetRotationX += (currentSpeed * 0.3) * delta;
      }

      // Animate swirling particle positions
      const positions = starsGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < starsCount; i++) {
        // Orbit math
        const xIdx = i * 3;
        const yIdx = i * 3 + 1;
        const zIdx = i * 3 + 2;

        const orbitalSpeed = starSpeeds[i] * 0.15;
        // Slowly skew the orbits for chaotic stellar elegance
        const tempX = positions[xIdx];
        const tempZ = positions[zIdx];

        positions[xIdx] = tempX * Math.cos(orbitalSpeed * delta) - tempZ * Math.sin(orbitalSpeed * delta);
        positions[zIdx] = tempX * Math.sin(orbitalSpeed * delta) + tempZ * Math.cos(orbitalSpeed * delta);
      }
      starsGeo.attributes.position.needsUpdate = true;

      // Face metrics updates
      const vertCount = coreMesh.visible ? coreGeo.attributes.position.count : 0 + (starPoints.visible ? starsCount : 0);
      const faceCount = coreMesh.visible ? coreGeo.index ? coreGeo.index.count / 3 : 0 : 0;
      
      if (vertCount !== metricsRef.current.vertices) {
        metricsRef.current.vertices = vertCount;
        metricsRef.current.polygons = faceCount;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    // Trigger frame
    lastTime = performance.now();
    animationFrameId = requestAnimationFrame(render);

    // Responsive adaptation on container resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height || 350;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Cleanup memory
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onMouseUp);

      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeScheme]);

  return (
    <div id="3d-interactive-core" className="relative bg-[#060606] border border-white/10 p-6 flex flex-col justify-between overflow-hidden group">
      
      {/* Decorative Matrix Brackets */}
      <div className="absolute top-0 right-0 w-4 h-4 border-r border-t border-accent" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l border-b border-accent" />
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-accent/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-accent/40" />

      {/* Sweeping holographic laser scanline scanner */}
      {showScanline && (
        <div className="absolute inset-x-0 h-[1.5px] bg-accent/25 shadow-[0_0_12px_#00FFD1] pointer-events-none animate-[scan-glow_4s_ease-in-out_infinite]" />
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div>
          <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            Optigrid Design Lab 3D
          </span>
          <span className="text-[8px] font-mono text-white/40 block mt-0.5">INTERACTIVE DESIGN MODEL PREVIEW</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-white/50 block">STATUS: ONLINE</span>
          <span className="text-[8px] font-mono text-accent block font-bold tracking-wider">// LIVE_PRESENTATION</span>
        </div>
      </div>

      {/* 3D Visualizer Canvas container */}
      <div className="relative w-full h-[320px] bg-black/40 border border-white/5 flex items-center justify-center cursor-grab active:cursor-grabbing">
        
        {/* Drag notification badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/90 border border-accent/20 px-3 py-1 rounded-full font-mono text-[8px] text-accent uppercase tracking-widest pointer-events-none z-10 flex items-center gap-1.5 shadow-lg">
          <Rotate3d className="w-3 h-3 animate-spin duration-3000" />
          <span>Click & Drag to Rotate Model</span>
        </div>

        {/* 3D Canvas Mount Point */}
        <div ref={mountRef} className="w-full h-full absolute inset-0" />
      </div>

      {/* INTERACTIVE CONTROLS (Exactly like the car/sneaker customizer in the video) */}
      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Left Control Column: Color and Styles */}
        <div className="space-y-3">
          {/* Color Scheme Picker */}
          <div>
            <label className="text-[9px] font-mono text-white/50 uppercase tracking-widest block mb-2 flex items-center gap-1.5 font-bold">
              <Palette className="w-3 h-3 text-accent" /> Select Brand Accent Color:
            </label>
            <div className="flex gap-2">
              {SCHEMES.map((sc) => (
                <button
                  key={sc.name}
                  onClick={() => setActiveScheme(sc)}
                  className={`px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1 border transition-all ${
                    activeScheme.name === sc.name
                      ? "bg-accent/10 border-accent text-accent shadow-[0_0_10px_rgba(0,255,209,0.15)]"
                      : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                  }`}
                  style={{
                    boxShadow: activeScheme.name === sc.name ? `0 0 12px ${sc.glow}` : "none"
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.primary }} />
                  {sc.name.split(" ")[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Mesh Visualization Mode */}
          <div>
            <label className="text-[9px] font-mono text-white/50 uppercase tracking-widest block mb-2 flex items-center gap-1.5 font-bold">
              <Layers className="w-3 h-3 text-accent" /> Structural Model Layout:
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: "wireframe", label: "Wireframe" },
                { id: "particle_cloud", label: "Cloud" },
                { id: "solid", label: "Solid" },
                { id: "quantum_ring", label: "Ring" }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setMeshStyle(style.id as any)}
                  className={`py-1 font-mono text-[8px] uppercase tracking-wider border text-center transition-all ${
                    meshStyle === style.id
                      ? "bg-accent text-brand-black border-accent font-bold"
                      : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Control Column: Interactive Sliders */}
        <div className="space-y-2.5">
          {/* Orbital Speed Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Zap className="w-3 h-3 text-accent" /> Interactive Rotation Speed:
              </span>
              <span className="text-[9px] font-mono text-accent font-bold">×{rotationSpeed.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-accent"
            />
          </div>

          {/* Explode / Modular Decompress Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Workflow className="w-3 h-3 text-accent" /> Modular Decompress:
              </span>
              <span className="text-[9px] font-mono text-accent font-bold">+{Math.round(explosionDim * 66)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1.5"
              step="0.05"
              value={explosionDim}
              onChange={(e) => setExplosionDim(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-accent"
              style={{ accentColor: "#00FFD1" }}
            />
          </div>

          {/* Scanline and Scaling toggles */}
          <div className="flex items-center gap-4 justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest font-bold">Hologram Scanlines:</span>
              <button 
                onClick={() => setShowScanline(!showScanline)}
                className={`w-8 h-4 rounded-full border transition-all relative ${
                  showScanline ? "bg-accent/20 border-accent" : "bg-white/5 border-white/10"
                }`}
              >
                <span className={`absolute top-[2.5px] w-2.5 h-2.5 rounded-full transition-all ${
                  showScanline ? "left-[14px] bg-accent" : "left-1 bg-white/30"
                }`} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest font-bold">Render Zoom:</span>
              <div className="flex border border-white/10">
                <button 
                  onClick={() => setScaleFactor(prev => Math.max(0.6, prev - 0.1))}
                  className="px-2 py-0.5 font-mono text-[8px] bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border-r border-white/10"
                >
                  -
                </button>
                <span className="px-2 py-0.5 font-mono text-[8px] text-accent font-bold">{Math.round(scaleFactor * 100)}%</span>
                <button 
                  onClick={() => setScaleFactor(prev => Math.min(1.4, prev + 0.1))}
                  className="px-2 py-0.5 font-mono text-[8px] bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border-l border-white/10"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[7px] text-white/30 font-mono uppercase">
        <span>WebGL2 RENDERER_OK</span>
        <span>// PIPELINE INTEGRITY GUARANTEED BY OPTIGRID LABS</span>
      </div>
    </div>
  );
}
