"use client";

import { Children, type ReactNode, useEffect, useRef, useState } from "react";

type DraggableCarouselProps = { children: ReactNode; label: string };

export function DraggableCarousel({ children, label }: DraggableCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const itemCount = items.length;
  const [activeIndex, setActiveIndex] = useState(0);

  function getLoopWidth() {
    const viewport = viewportRef.current;
    return viewport ? viewport.scrollWidth / 3 : 0;
  }

  function getStepWidth() {
    return getLoopWidth() / itemCount;
  }

  function updateActiveIndex() {
    const viewport = viewportRef.current;
    const loopWidth = getLoopWidth();
    const stepWidth = getStepWidth();
    if (!viewport || !loopWidth || !stepWidth) return;

    const positionInLoop = ((viewport.scrollLeft % loopWidth) + loopWidth) % loopWidth;
    setActiveIndex(Math.min(itemCount - 1, Math.round(positionInLoop / stepWidth)));
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
  }, [itemCount]);

  function scrollByCard(direction: number) {
    viewportRef.current?.scrollBy({ left: direction * getStepWidth(), behavior: "smooth" });
  }

  function goToSlide(index: number) {
    const viewport = viewportRef.current;
    const loopWidth = getLoopWidth();
    if (!viewport || !loopWidth) return;
    viewport.scrollTo({ left: loopWidth + index * getStepWidth(), behavior: "smooth" });
  }

  return (
    <div className="relative px-12 sm:px-14">
      <button
        type="button"
        aria-label="Ver tarjetas anteriores"
        className="absolute left-0 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700 shadow-md transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        onClick={() => scrollByCard(-1)}
      >
        <span aria-hidden="true">&larr;</span>
      </button>

      <div
        ref={viewportRef}
        aria-label={label}
        className="carousel-viewport flex gap-5 overflow-x-auto overscroll-x-contain py-2 snap-x snap-mandatory"
        onScroll={() => {
          normalizeScrollPosition();
          updateActiveIndex();
        }}
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
        aria-label="Ver más tarjetas"
        className="absolute right-0 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-blue-200 bg-white text-lg text-blue-700 shadow-md transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        onClick={() => scrollByCard(1)}
      >
        <span aria-hidden="true">&rarr;</span>
      </button>

      <div className="mt-5 flex justify-center">
        <div className="flex items-center gap-2" aria-label="Seleccionar tarjeta">
          {items.map((_, index) => (
            <button
              key={`indicator-${index}`}
              type="button"
              aria-label={`Ir a la tarjeta ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className="flex min-h-11 min-w-11 items-center justify-center p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              onClick={() => goToSlide(index)}
            >
              <span className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-6 bg-blue-700" : "w-2 bg-blue-200 hover:bg-blue-400"}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
