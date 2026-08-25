"use client";

import { Children, type PointerEvent, type ReactNode, useEffect, useRef, useState } from "react";

type DraggableCarouselProps = { children: ReactNode; label: string };

export function DraggableCarousel({ children, label }: DraggableCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const dragState = useRef({ startX: 0, startScrollLeft: 0, lastX: 0, lastTime: 0, velocity: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function getLoopWidth() {
    const viewport = viewportRef.current;
    return viewport ? viewport.scrollWidth / 3 : 0;
  }

  function getStepWidth() {
    return getLoopWidth() / items.length;
  }

  function updateActiveIndex() {
    const viewport = viewportRef.current;
    const loopWidth = getLoopWidth();
    const stepWidth = getStepWidth();
    if (!viewport || !loopWidth || !stepWidth) return;

    const positionInLoop = ((viewport.scrollLeft % loopWidth) + loopWidth) % loopWidth;
    setActiveIndex(Math.min(items.length - 1, Math.round(positionInLoop / stepWidth)));
  }

  function normalizeScrollPosition() {
    const viewport = viewportRef.current;
    const loopWidth = getLoopWidth();
    if (!viewport || !loopWidth) return;

    if (viewport.scrollLeft < loopWidth * 0.5) {
      viewport.scrollLeft += loopWidth;
    } else if (viewport.scrollLeft >= loopWidth * 1.5) {
      viewport.scrollLeft -= loopWidth;
    }
  }

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const frame = requestAnimationFrame(() => {
      viewport.scrollLeft = getLoopWidth();
    });
    return () => cancelAnimationFrame(frame);
  }, [items.length]);

  function scrollByCard(direction: number) {
    viewportRef.current?.scrollBy({ left: direction * getStepWidth(), behavior: "smooth" });
  }

  function goToSlide(index: number) {
    const viewport = viewportRef.current;
    const loopWidth = getLoopWidth();
    if (!viewport || !loopWidth) return;
    viewport.scrollTo({ left: loopWidth + index * getStepWidth(), behavior: "smooth" });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    dragState.current = {
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    };
    viewport.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport || !isDragging) return;
    event.preventDefault();
    const now = performance.now();
    const elapsed = Math.max(now - dragState.current.lastTime, 1);
    const distance = event.clientX - dragState.current.lastX;
    dragState.current.velocity = distance / elapsed;
    dragState.current.lastX = event.clientX;
    dragState.current.lastTime = now;
    viewport.scrollLeft = dragState.current.startScrollLeft - (event.clientX - dragState.current.startX);
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (viewport?.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    setIsDragging(false);

    if (viewport && Math.abs(dragState.current.velocity) > 0.15) {
      viewport.scrollBy({ left: -dragState.current.velocity * 180, behavior: "smooth" });
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Ver tarjetas anteriores"
        className="absolute left-0 top-1/2 z-10 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700 shadow-md transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:-translate-x-1/2"
        onClick={() => scrollByCard(-1)}
      >
        <span aria-hidden="true">&larr;</span>
      </button>
      <div
        ref={viewportRef}
        aria-label={label}
        className={`carousel-viewport overflow-x-auto overscroll-x-contain py-2 select-none ${isDragging ? "cursor-grabbing is-dragging" : "cursor-grab"}`}
        onScroll={() => {
          normalizeScrollPosition();
          updateActiveIndex();
        }}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
      >
        <div className="flex w-max">
          {[0, 1, 2].map((copy) => (
            <div key={copy} className="flex gap-5 pr-5">
              {items}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Ver m&aacute;s tarjetas"
        className="absolute right-0 top-1/2 z-10 grid size-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700 shadow-md transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:translate-x-1/2"
        onClick={() => scrollByCard(1)}
      >
        <span aria-hidden="true">&rarr;</span>
      </button>
      <div className="mt-5 flex justify-center">
        <div className="flex items-center gap-2" aria-label="Seleccionar tarjeta">
          {items.map((item, index) => (
            <button
              key={`indicator-${index}`}
              type="button"
              aria-label={`Ir a la tarjeta ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ${activeIndex === index ? "w-6 bg-red-700" : "w-2 bg-red-200 hover:bg-red-400"}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
