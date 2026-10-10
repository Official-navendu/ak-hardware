'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Upload,
  RotateCcw,
  Undo2,
  Download,
  Paintbrush,
  Eraser,
  Wand2,
  Eye,
  Check,
  AlertCircle,
  Sliders,
  Sparkles,
  Info,
  RefreshCw,
} from 'lucide-react';

interface SampleColor {
  hex: string;
  name: string;
  category: 'Whites' | 'Greys' | 'Blues' | 'Greens' | 'Earthy';
}

const SAMPLE_COLORS: SampleColor[] = [
  // Whites & Creams
  { hex: '#FFFFFF', name: 'Pure White', category: 'Whites' },
  { hex: '#F8F6F0', name: 'Soft Ivory', category: 'Whites' },
  { hex: '#FFFDD0', name: 'Warm Cream', category: 'Whites' },
  { hex: '#F2EFE9', name: 'Classic Pearl', category: 'Whites' },
  // Greys & Neutrals
  { hex: '#808A87', name: 'Slate Grey', category: 'Greys' },
  { hex: '#4A5568', name: 'Charcoal', category: 'Greys' },
  { hex: '#C4C5C7', name: 'Soft Dove', category: 'Greys' },
  { hex: '#9D988E', name: 'Greige', category: 'Greys' },
  // Blues & Royals
  { hex: '#014A94', name: 'AK Royal Blue', category: 'Blues' },
  { hex: '#012157', name: 'Deep Navy', category: 'Blues' },
  { hex: '#4A90E2', name: 'Sky Blue', category: 'Blues' },
  { hex: '#2C5282', name: 'Ocean Blue', category: 'Blues' },
  // Greens & Nature
  { hex: '#718096', name: 'Sage Green', category: 'Greens' },
  { hex: '#38A169', name: 'Emerald Green', category: 'Greens' },
  { hex: '#4A7C59', name: 'Forest Green', category: 'Greens' },
  { hex: '#8FBC8F', name: 'Soft Mint', category: 'Greens' },
  // Earthy & Warm Tones
  { hex: '#C05621', name: 'Terracotta', category: 'Earthy' },
  { hex: '#D69E2E', name: 'Warm Ochre', category: 'Earthy' },
  { hex: '#FA3A08', name: 'AK Bright Orange', category: 'Earthy' },
  { hex: '#B8860B', name: 'Golden Sand', category: 'Earthy' },
];

const SAMPLE_IMAGES = [
  { id: 'living', label: 'Living Area', src: '/assets/living room.png' },
  { id: 'facade', label: 'Exterior Facade', src: '/assets/exterior-facade.png' },
  { id: 'bedroom', label: 'Bedroom Area', src: '/assets/bedroom.png' },
];

type ToolType = 'wand' | 'brush' | 'eraser';

interface PaintVisualizerProps {
  selectedHex?: string;
  selectedColorName?: string;
}

export const PaintVisualizer: React.FC<PaintVisualizerProps> = ({
  selectedHex,
  selectedColorName,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('#014A94');
  const [activeTool, setActiveTool] = useState<ToolType>('wand');
  const [brushSize, setBrushSize] = useState<number>(25);
  const [tolerance, setTolerance] = useState<number>(30); // 1-100 tolerance for wand
  const [imageSrc, setImageSrc] = useState<string | null>(SAMPLE_IMAGES[0].src);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage for split slider
  const [activeTabCategory, setActiveTabCategory] = useState<string>('All');
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Sync external selected hex from Paint Shade Library
  useEffect(() => {
    if (selectedHex) {
      setSelectedColor(selectedHex);
      if (selectedColorName) {
        setAppliedNotification(`Applied "${selectedColorName}" (${selectedHex}) to Visualizer. Click on the photo to paint your wall!`);
        const timer = setTimeout(() => setAppliedNotification(null), 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedHex, selectedColorName]);

  // Canvas References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const originalImageDataRef = useRef<ImageData | null>(null);
  const maskDataRef = useRef<Uint8Array | null>(null); // Mask array (1 = painted, 0 = unpainted)
  const historyStackRef = useRef<Uint8Array[]>([]); // Undo history stack
  const isDrawingRef = useRef<boolean>(false);

  // Load image onto canvas and initialize mask
  const loadImageToCanvas = useCallback((src: string) => {
    setIsProcessing(true);
    setErrorMsg(null);

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Fit to reasonable max dimensions
      const maxDim = 900;
      let width = img.width;
      let height = img.height;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);

      // Save original image data
      originalImageDataRef.current = ctx.getImageData(0, 0, width, height);
      maskDataRef.current = new Uint8Array(width * height);
      historyStackRef.current = [];

      setIsProcessing(false);
    };

    img.onerror = () => {
      setErrorMsg('Failed to load image. Please try uploading another photo.');
      setIsProcessing(false);
    };
  }, []);

  useEffect(() => {
    if (imageSrc) {
      loadImageToCanvas(imageSrc);
    }
  }, [imageSrc, loadImageToCanvas]);

  // Render canvas with mask and color blending
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const origData = originalImageDataRef.current;
    const mask = maskDataRef.current;

    if (!canvas || !origData || !mask) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Parse target color hex
    let hex = selectedColor.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    const tR = parseInt(hex.substring(0, 2), 16) || 0;
    const tG = parseInt(hex.substring(2, 4), 16) || 0;
    const tB = parseInt(hex.substring(4, 6), 16) || 0;

    const newImageData = ctx.createImageData(width, height);
    const srcPixels = origData.data;
    const destPixels = newImageData.data;

    for (let i = 0; i < mask.length; i++) {
      const pxIdx = i * 4;

      if (mask[i] === 1) {
        // Compute original luminance (0..1)
        const origR = srcPixels[pxIdx];
        const origG = srcPixels[pxIdx + 1];
        const origB = srcPixels[pxIdx + 2];
        const alpha = srcPixels[pxIdx + 3];

        const lum = (0.299 * origR + 0.587 * origG + 0.114 * origB) / 255;

        // Multiply / Luminance-preserving paint blend
        // Retains wall textures and light highlights naturally
        destPixels[pxIdx] = Math.min(255, Math.round(tR * (lum * 0.85 + 0.15)));
        destPixels[pxIdx + 1] = Math.min(255, Math.round(tG * (lum * 0.85 + 0.15)));
        destPixels[pxIdx + 2] = Math.min(255, Math.round(tB * (lum * 0.85 + 0.15)));
        destPixels[pxIdx + 3] = alpha;
      } else {
        // Original image pixel
        destPixels[pxIdx] = srcPixels[pxIdx];
        destPixels[pxIdx + 1] = srcPixels[pxIdx + 1];
        destPixels[pxIdx + 2] = srcPixels[pxIdx + 2];
        destPixels[pxIdx + 3] = srcPixels[pxIdx + 3];
      }
    }

    ctx.putImageData(newImageData, 0, 0);
  }, [selectedColor]);

  // Re-render whenever color changes
  useEffect(() => {
    renderCanvas();
  }, [selectedColor, renderCanvas]);

  // Push current mask to undo stack
  const saveUndoState = () => {
    if (maskDataRef.current) {
      historyStackRef.current.push(new Uint8Array(maskDataRef.current));
      if (historyStackRef.current.length > 20) {
        historyStackRef.current.shift(); // keep max 20 states
      }
    }
  };

  // Undo action
  const handleUndo = () => {
    if (historyStackRef.current.length > 0) {
      const lastMask = historyStackRef.current.pop();
      if (lastMask && maskDataRef.current) {
        maskDataRef.current.set(lastMask);
        renderCanvas();
      }
    }
  };

  // Reset to original
  const handleReset = () => {
    if (maskDataRef.current) {
      saveUndoState();
      maskDataRef.current.fill(0);
      renderCanvas();
    }
  };

  // Magic Wand Smart Selection (Flood-fill color tolerance)
  const applyMagicWand = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    const origData = originalImageDataRef.current;
    const mask = maskDataRef.current;

    if (!canvas || !origData || !mask) return;

    saveUndoState();

    const width = canvas.width;
    const height = canvas.height;
    const pixels = origData.data;

    const startIdx = (startY * width + startX) * 4;
    const targetR = pixels[startIdx];
    const targetG = pixels[startIdx + 1];
    const targetB = pixels[startIdx + 2];

    const maxDiff = (tolerance / 100) * 441.67; // max RGB distance (sqrt(255^2*3))

    // Flood fill algorithm using queue
    const queue: number[] = [startX + startY * width];
    const visited = new Uint8Array(width * height);

    while (queue.length > 0) {
      const curr = queue.pop()!;
      if (visited[curr]) continue;
      visited[curr] = 1;

      const pxIdx = curr * 4;
      const r = pixels[pxIdx];
      const g = pixels[pxIdx + 1];
      const b = pixels[pxIdx + 2];

      const diff = Math.sqrt(
        Math.pow(r - targetR, 2) + Math.pow(g - targetG, 2) + Math.pow(b - targetB, 2)
      );

      if (diff <= maxDiff) {
        mask[curr] = 1;

        const x = curr % width;
        const y = Math.floor(curr / width);

        if (x > 0) queue.push(curr - 1);
        if (x < width - 1) queue.push(curr + 1);
        if (y > 0) queue.push(curr - width);
        if (y < height - 1) queue.push(curr + width);
      }
    }

    renderCanvas();
  };

  // Manual Brush / Eraser Stroke
  const applyBrushStroke = (x: number, y: number, isErase: boolean) => {
    const canvas = canvasRef.current;
    const mask = maskDataRef.current;
    if (!canvas || !mask) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.round(brushSize / 2);

    const val = isErase ? 0 : 1;

    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        if (dx * dx + dy * dy <= radius * radius) {
          const pxX = x + dx;
          const pxY = y + dy;
          if (pxX >= 0 && pxX < width && pxY >= 0 && pxY < height) {
            mask[pxY * width + pxX] = val;
          }
        }
      }
    }
  };

  // Canvas Mouse / Touch Event Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    if (activeTool === 'wand') {
      applyMagicWand(x, y);
    } else {
      saveUndoState();
      isDrawingRef.current = true;
      applyBrushStroke(x, y, activeTool === 'eraser');
      renderCanvas();
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || activeTool === 'wand') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    applyBrushStroke(x, y, activeTool === 'eraser');
    renderCanvas();
  };

  const handleCanvasMouseUp = () => {
    isDrawingRef.current = false;
  };

  // Image Upload Handler
  const handleFileUpload = (file: File) => {
    setErrorMsg(null);

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg('Invalid file format. Please upload a PNG, JPG, or WEBP photo.');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File is too large. Maximum allowed photo size is 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageSrc(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Download Edited Image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `ak-hardware-home-paint-preview-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const filteredColors =
    activeTabCategory === 'All'
      ? SAMPLE_COLORS
      : SAMPLE_COLORS.filter((c) => c.category === activeTabCategory);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* SECTION HEADER BAR */}
      <div className="bg-[#012157] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-sky-300 uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5 text-[#FA3A08]" />
            <span>Interactive Visualizer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Customize Your Home
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1 max-w-2xl leading-relaxed">
            Upload a photo of your home or choose a sample room below. Use the smart wall selector or brush to explore how different paint shades look on your walls.
          </p>
        </div>

        {/* QUICK PHOTO REPLACEMENT & ACTION BAR */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="h-10 px-4 bg-[#FA3A08] hover:bg-[#d92e00] text-white font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs">
            <Upload className="h-4 w-4" />
            <span>Upload Photo</span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* APPLIED SHADE NOTIFICATION BANNER */}
      {appliedNotification && (
        <div className="bg-emerald-50 border-b border-emerald-200 p-3 px-6 text-xs font-bold text-emerald-800 flex items-center justify-between gap-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>{appliedNotification}</span>
          </div>
          <button
            onClick={() => setAppliedNotification(null)}
            className="text-emerald-700 hover:underline text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ERROR FEEDBACK BANNER */}
      {errorMsg && (
        <div className="bg-red-50 border-b border-red-200 p-4 text-xs font-bold text-red-700 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="text-red-600 hover:underline text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* MAIN TWO-COLUMN VISUALIZER INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        
        {/* LEFT COLUMN: CANVAS DISPLAY & COMPARISON VIEW (7 COLS) */}
        <div className="lg:col-span-7 p-4 md:p-6 bg-slate-50 flex flex-col gap-4">
          
          {/* SAMPLE ROOM SELECTION STRIP */}
          <div className="flex items-center justify-between gap-2 pb-2">
            <span className="text-xs font-bold text-[#111827]">Try Sample Photos:</span>
            <div className="flex items-center gap-1.5">
              {SAMPLE_IMAGES.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setImageSrc(img.src)}
                  className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                    imageSrc === img.src
                      ? 'bg-[#014A94] text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* MAIN CANVAS / PREVIEW WORKSPACE */}
          <div className="relative w-full min-h-[340px] sm:min-h-[420px] bg-slate-200/70 rounded-xl border border-slate-300 flex items-center justify-center overflow-hidden group shadow-inner">
            
            {/* CANVAS RENDERER */}
            <canvas
              ref={canvasRef}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              className={`max-w-full max-h-[500px] object-contain cursor-${
                activeTool === 'wand' ? 'crosshair' : 'cell'
              }`}
            />

            {/* PROCESSING OVERLAY */}
            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-xs font-bold text-[#014A94]">
                <RefreshCw className="h-6 w-6 animate-spin text-[#FA3A08]" />
                <span>Processing Image...</span>
              </div>
            )}

            {/* BEFORE / AFTER SPLIT COMPARISON OVERLAY */}
            {showComparison && imageSrc && (
              <div className="absolute inset-0 bg-white z-20 overflow-hidden select-none">
                {/* Original Background Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={imageSrc}
                    alt="Original Photo"
                    fill
                    className="object-contain"
                  />
                  
                  {/* Recolored Canvas Overlay clipped by slider */}
                  <div
                    className="absolute inset-0 overflow-hidden border-r-2 border-[#FA3A08] shadow-lg"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div className="relative w-full h-full">
                      {canvasRef.current && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={canvasRef.current.toDataURL()}
                          alt="Painted Preview"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {/* SLIDER HANDLE */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FA3A08] text-white flex items-center justify-center shadow-lg pointer-events-none z-30"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <Sliders className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CANVAS TOOLBAR & ACTION CONTROLS */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
            {/* TOOLS SELECTOR */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTool('wand')}
                className={`h-9 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTool === 'wand'
                    ? 'bg-[#014A94] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Smart Click Wall Selection (Flood fill)"
              >
                <Wand2 className="h-4 w-4" />
                <span>Smart Select</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('brush')}
                className={`h-9 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTool === 'brush'
                    ? 'bg-[#014A94] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Manual Paint Brush"
              >
                <Paintbrush className="h-4 w-4" />
                <span>Brush</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool('eraser')}
                className={`h-9 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTool === 'eraser'
                    ? 'bg-[#014A94] text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title="Eraser to clean door/window edges"
              >
                <Eraser className="h-4 w-4" />
                <span>Eraser</span>
              </button>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUndo}
                className="h-9 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                title="Undo last stroke"
              >
                <Undo2 className="h-3.5 w-3.5" />
                <span>Undo</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="h-9 px-3 bg-slate-100 hover:bg-red-50 text-red-600 hover:text-red-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                title="Reset to original unpainted image"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={() => setShowComparison((prev) => !prev)}
                className={`h-9 px-3 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 ${
                  showComparison
                    ? 'bg-[#FA3A08] text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{showComparison ? 'Back to Editing' : 'Compare Before/After'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="h-9 px-3 bg-[#00A23A] hover:bg-[#008830] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                title="Download preview photo"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* TOOL SETTINGS (BRUSH SIZE / TOLERANCE) */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
            {activeTool === 'wand' ? (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="font-bold text-slate-700">Selection Tolerance:</span>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="w-32 accent-[#014A94]"
                />
                <span className="font-bold text-[#014A94] w-8">{tolerance}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="font-bold text-slate-700">Brush Size:</span>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-32 accent-[#014A94]"
                />
                <span className="font-bold text-[#014A94] w-8">{brushSize}px</span>
              </div>
            )}

            <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Info className="h-3.5 w-3.5 text-[#014A94]" />
              <span>
                {activeTool === 'wand'
                  ? 'Click any wall area in the photo to auto-fill paint.'
                  : activeTool === 'brush'
                  ? 'Click and drag to manually paint wall sections.'
                  : 'Click and drag to erase paint from doors or windows.'}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PALETTE & COLOR CONTROLS (5 COLS) */}
        <div className="lg:col-span-5 p-4 md:p-6 bg-white flex flex-col gap-5">
          
          {/* SELECTED COLOR DISPLAY */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl border-2 border-white shadow-md transition-transform"
                style={{ backgroundColor: selectedColor }}
              />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Active Paint Color
                </span>
                <span className="text-sm font-extrabold text-[#111827]">
                  {SAMPLE_COLORS.find(
                    (c) => c.hex.toLowerCase() === selectedColor.toLowerCase()
                  )?.name || 'Custom Color'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-600 uppercase bg-white px-2.5 py-1 rounded-md border border-slate-200">
                {selectedColor}
              </span>
            </div>
          </div>

          {/* PALETTE CATEGORY TABS */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#111827]">
                Sample Paint Shades Palette
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                ({SAMPLE_COLORS.length} Shades)
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-2">
              {['All', 'Whites', 'Greys', 'Blues', 'Greens', 'Earthy'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTabCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeTabCategory === cat
                      ? 'bg-[#014A94] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* COLOR GRID */}
            <div className="grid grid-cols-4 gap-2.5 max-h-[260px] overflow-y-auto p-1">
              {filteredColors.map((col) => {
                const isSelected = selectedColor.toLowerCase() === col.hex.toLowerCase();
                return (
                  <button
                    key={col.hex + col.name}
                    type="button"
                    onClick={() => setSelectedColor(col.hex)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all text-left group cursor-pointer ${
                      isSelected
                        ? 'border-[#014A94] bg-blue-50/50 shadow-xs ring-2 ring-[#014A94]/20 scale-105'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className="w-full aspect-square rounded-lg border border-black/10 flex items-center justify-center shadow-2xs relative"
                      style={{ backgroundColor: col.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`h-4 w-4 ${
                            col.hex === '#FFFFFF' || col.hex === '#F8F6F0' || col.hex === '#FFFDD0'
                              ? 'text-slate-800'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
                      {col.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CUSTOM COLOR PICKER & HEX INPUT */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <span className="text-xs font-extrabold text-[#111827]">
              Custom Shade Picker
            </span>

            <div className="flex items-center gap-3">
              <label className="relative w-10 h-10 rounded-xl overflow-hidden cursor-pointer border border-slate-300 shadow-2xs flex-shrink-0">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="absolute inset-0 w-16 h-16 -top-3 -left-3 cursor-pointer"
                />
              </label>

              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Hex Code:</span>
                <input
                  type="text"
                  value={selectedColor}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedColor(val);
                  }}
                  placeholder="#014A94"
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-[#111827] focus:outline-none focus:border-[#014A94]"
                />
              </div>
            </div>
          </div>

          {/* PRIVACY & DISCLAIMER NOTE */}
          <div className="mt-auto bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 font-normal leading-relaxed">
            <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-[#014A94]" />
              <span>Color &amp; Privacy Disclaimer</span>
            </p>
            <p>
              100% Client-Side Privacy: Your uploaded home photos remain strictly inside your browser and are never saved or sent to any external server. Paint previews are indicative; actual appearance varies with natural lighting and wall finish.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
