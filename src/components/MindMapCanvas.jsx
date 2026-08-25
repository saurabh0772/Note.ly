import React, { useRef, useState, useEffect } from 'react';
import RootCard from './RootCard';
import SectionHeaderCard from './SectionHeaderCard';
import DiagramCard from './DiagramCard';
import { mindmapData } from '../data/mindmapData';

export default function MindMapCanvas({
  zoom,
  setZoom,
  searchTerm,
  matchedIds,
  onResetZoom
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Pan State
  const [pan, setPan] = useState({ x: 60, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Store connector lines endpoints
  const [connectors, setConnectors] = useState([]);

  // Mouse Drag Handler
  const handleMouseDown = (e) => {
    // Only drag if clicking canvas background or non-interactive elements
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('code')) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mouse Wheel Zoom
  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey || true) {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.35), 2.0));
    }
  };

  // Re-calculate SVG connector lines
  const updateConnectors = () => {
    if (!canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const getPos = (id, handle = 'right') => {
      const el = document.getElementById(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();

      // Convert rect screen coordinates to canvas unscaled relative coordinates
      const scale = zoom;
      const leftRel = (r.left - canvasRect.left) / scale;
      const rightRel = (r.right - canvasRect.left) / scale;
      const topRel = (r.top - canvasRect.top) / scale;
      const bottomRel = (r.bottom - canvasRect.top) / scale;

      const midY = (topRel + bottomRel) / 2;

      if (handle === 'left') return { x: leftRel, y: midY };
      if (handle === 'right') return { x: rightRel, y: midY };
      if (handle === 'top') return { x: (leftRel + rightRel) / 2, y: topRel };
      if (handle === 'bottom') return { x: (leftRel + rightRel) / 2, y: bottomRel };

      return { x: rightRel, y: midY };
    };

    const newLines = [];

    // Root to 3 Section Headers
    const rootPos = getPos('root', 'right');
    const sec1Pos = getPos('sec-1', 'left');
    const sec2Pos = getPos('sec-2', 'left');
    const sec3Pos = getPos('sec-3', 'left');

    if (rootPos) {
      if (sec1Pos) newLines.push({ id: 'root-sec1', start: rootPos, end: sec1Pos, color: '#f43f5e', width: 3 });
      if (sec2Pos) newLines.push({ id: 'root-sec2', start: rootPos, end: sec2Pos, color: '#3b82f6', width: 3 });
      if (sec3Pos) newLines.push({ id: 'root-sec3', start: rootPos, end: sec3Pos, color: '#10b981', width: 3 });
    }

    // Section 1 (Red) Header to Sub-cards
    const sec1HeaderPos = getPos('sec-1', 'right');
    ['1-A', '1-B', '1-C'].forEach((cardId) => {
      const cardPos = getPos(cardId, 'left');
      if (sec1HeaderPos && cardPos) {
        newLines.push({ id: `sec1-${cardId}`, start: sec1HeaderPos, end: cardPos, color: '#fda4af', width: 2 });
      }
    });

    // Section 2 (Blue) Header to Sub-cards
    const sec2HeaderPos = getPos('sec-2', 'right');
    ['2-A', '2-B', '2-C', '2-D'].forEach((cardId) => {
      const cardPos = getPos(cardId, 'left');
      if (sec2HeaderPos && cardPos) {
        newLines.push({ id: `sec2-${cardId}`, start: sec2HeaderPos, end: cardPos, color: '#93c5fd', width: 2 });
      }
    });

    // Section 3 (Green) Header to Sub-cards
    const sec3HeaderPos = getPos('sec-3', 'right');
    ['3-A', '3-B', '3-C'].forEach((cardId) => {
      const cardPos = getPos(cardId, 'left');
      if (sec3HeaderPos && cardPos) {
        newLines.push({ id: `sec3-${cardId}`, start: sec3HeaderPos, end: cardPos, color: '#6ee7b7', width: 2 });
      }
    });

    setConnectors(newLines);
  };

  useEffect(() => {
    updateConnectors();
    const timer = setTimeout(updateConnectors, 200);
    window.addEventListener('resize', updateConnectors);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateConnectors);
    };
  }, [zoom, pan]);

  // Cubic Bezier Path Helper
  const getBezierPath = (start, end) => {
    const dx = Math.abs(end.x - start.x) * 0.45;
    return `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;
  };

  const isMatched = (id) => matchedIds.has(id);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      className="w-screen h-screen overflow-hidden canvas-grid cursor-grab active:cursor-grabbing relative select-none"
    >
      {/* Transform Wrapper */}
      <div
        ref={canvasRef}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
        className="absolute top-0 left-0 min-w-[2800px] min-h-[1800px] p-12"
      >
        {/* SVG Connectors Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
          </defs>
          {connectors.map((c) => (
            <path
              key={c.id}
              d={getBezierPath(c.start, c.end)}
              fill="none"
              stroke={c.color}
              strokeWidth={c.width}
              strokeDasharray={c.dash ? '4,4' : 'none'}
              className="connector-path"
            />
          ))}
        </svg>

        {/* Mind Map Nodes Grid (Matching Reference Layout 1:1) */}
        <div className="relative z-10 flex gap-24 items-start pt-16">
          
          {/* Column 0: Root Node (Left Side Center) */}
          <div className="sticky top-20 pt-48">
            <RootCard data={mindmapData.root} isMatched={isMatched('root')} />
          </div>

          {/* Section Branches Layout */}
          <div className="flex flex-col gap-16">

            {/* SECTION 1: Callbacks & Callback Hell (Red / Pink Theme) */}
            <div className="flex gap-12 items-start bg-red-50/20 p-6 rounded-3xl border border-red-200/50 backdrop-blur-3xs shadow-2xs">
              {/* Section Header 1 */}
              <div className="sticky top-20">
                <SectionHeaderCard section={mindmapData.sections[0]} isMatched={isMatched('sec-1')} />
              </div>

              {/* Cards for Section 1 */}
              <div className="flex flex-col gap-6">
                {/* Row 1: A & B */}
                <div className="flex gap-6 items-start">
                  <div className="w-80">
                    <DiagramCard card={mindmapData.sections[0].cards[0]} sectionColor="red" isMatched={isMatched('1-A')} />
                  </div>
                  <div className="w-[420px]">
                    <DiagramCard card={mindmapData.sections[0].cards[1]} sectionColor="red" isMatched={isMatched('1-B')} />
                  </div>
                </div>

                {/* Row 2: C (Pyramid of doom) */}
                <div className="w-[520px]">
                  <DiagramCard card={mindmapData.sections[0].cards[2]} sectionColor="red" isMatched={isMatched('1-C')} />
                </div>

                {/* Row 3: D, E, F */}
                <div className="flex gap-6 items-start">
                  <div className="w-72">
                    <DiagramCard card={mindmapData.sections[0].cards[3]} sectionColor="red" isMatched={isMatched('1-D')} />
                  </div>
                  <div className="w-64">
                    <DiagramCard card={mindmapData.sections[0].cards[4]} sectionColor="red" isMatched={isMatched('1-E')} />
                  </div>
                  <div className="w-96">
                    <DiagramCard card={mindmapData.sections[0].cards[5]} sectionColor="red" isMatched={isMatched('1-F')} />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Promises & Async/Await (Blue Theme) */}
            <div className="flex gap-12 items-start bg-blue-50/20 p-6 rounded-3xl border border-blue-200/50 backdrop-blur-3xs shadow-2xs">
              {/* Section Header 2 */}
              <div className="sticky top-20">
                <SectionHeaderCard section={mindmapData.sections[1]} isMatched={isMatched('sec-2')} />
              </div>

              {/* Cards for Section 2 */}
              <div className="flex flex-col gap-6">
                {/* Row 1: A, B, C, D */}
                <div className="flex gap-6 items-start">
                  <div className="w-72">
                    <DiagramCard card={mindmapData.sections[1].cards[0]} sectionColor="blue" isMatched={isMatched('2-A')} />
                  </div>
                  <div className="w-80">
                    <DiagramCard card={mindmapData.sections[1].cards[1]} sectionColor="blue" isMatched={isMatched('2-B')} />
                  </div>
                  <div className="w-72">
                    <DiagramCard card={mindmapData.sections[1].cards[2]} sectionColor="blue" isMatched={isMatched('2-C')} />
                  </div>
                  <div className="w-72">
                    <DiagramCard card={mindmapData.sections[1].cards[3]} sectionColor="blue" isMatched={isMatched('2-D')} />
                  </div>
                </div>

                {/* Row 2: E, F, G, H */}
                <div className="flex gap-6 items-start">
                  <div className="w-[420px]">
                    <DiagramCard card={mindmapData.sections[1].cards[4]} sectionColor="blue" isMatched={isMatched('2-E')} />
                  </div>
                  <div className="w-64">
                    <DiagramCard card={mindmapData.sections[1].cards[5]} sectionColor="blue" isMatched={isMatched('2-F')} />
                  </div>
                  <div className="w-96">
                    <DiagramCard card={mindmapData.sections[1].cards[6]} sectionColor="blue" isMatched={isMatched('2-G')} />
                  </div>
                  <div className="w-64">
                    <DiagramCard card={mindmapData.sections[1].cards[7]} sectionColor="blue" isMatched={isMatched('2-H')} />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Event Emitter (Green Theme) */}
            <div className="flex gap-12 items-start bg-emerald-50/20 p-6 rounded-3xl border border-emerald-200/50 backdrop-blur-3xs shadow-2xs">
              {/* Section Header 3 */}
              <div className="sticky top-20">
                <SectionHeaderCard section={mindmapData.sections[2]} isMatched={isMatched('sec-3')} />
              </div>

              {/* Cards for Section 3 */}
              <div className="flex flex-col gap-6">
                {/* Row 1: A, B, C */}
                <div className="flex gap-6 items-start">
                  <div className="w-72">
                    <DiagramCard card={mindmapData.sections[2].cards[0]} sectionColor="green" isMatched={isMatched('3-A')} />
                  </div>
                  <div className="w-80">
                    <DiagramCard card={mindmapData.sections[2].cards[1]} sectionColor="green" isMatched={isMatched('3-B')} />
                  </div>
                  <div className="w-[450px]">
                    <DiagramCard card={mindmapData.sections[2].cards[2]} sectionColor="green" isMatched={isMatched('3-C')} />
                  </div>
                </div>

                {/* Row 2: D, E, F, G, H */}
                <div className="flex gap-6 items-start">
                  <div className="w-80">
                    <DiagramCard card={mindmapData.sections[2].cards[3]} sectionColor="green" isMatched={isMatched('3-D')} />
                  </div>
                  <div className="w-96">
                    <DiagramCard card={mindmapData.sections[2].cards[4]} sectionColor="green" isMatched={isMatched('3-E')} />
                  </div>
                  <div className="w-64">
                    <DiagramCard card={mindmapData.sections[2].cards[5]} sectionColor="green" isMatched={isMatched('3-F')} />
                  </div>
                  <div className="w-96">
                    <DiagramCard card={mindmapData.sections[2].cards[6]} sectionColor="green" isMatched={isMatched('3-G')} />
                  </div>
                  <div className="w-64">
                    <DiagramCard card={mindmapData.sections[2].cards[7]} sectionColor="green" isMatched={isMatched('3-H')} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
