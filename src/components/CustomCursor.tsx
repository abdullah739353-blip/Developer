import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    // Only enable on desktop/non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Adjust the multiplier for custom lag speed (0.15 is beautiful and responsive)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  if (isHidden) return null;

  return (
    <>
      {/* Central exact point */}
      <div
        className="pointer-events-none fixed z-100 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-luxury-gold mix-blend-difference transition-transform duration-100 ease-out"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {/* Outer elegant trail ring */}
      <div
        className={`pointer-events-none fixed z-100 rounded-full border border-luxury-gold -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isHovered
            ? 'h-12 w-12 bg-luxury-gold/10 border-luxury-gold-light scale-110 shadow-[0_0_15px_rgba(200,169,106,0.3)]'
            : 'h-7 w-7 bg-transparent border-luxury-gold/50'
        }`}
        style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
      />
    </>
  );
}
