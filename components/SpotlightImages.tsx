"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";

const IMAGE_POOL = [
  "/startup_trek_2026/1.jpg",
  "/startup_trek_2026/2.jpg",
  "/startup_trek_2026/3.jpg",
  "/startup_trek_2026/4.jpg",
  "/startup_trek_2026/5.jpg",
  "/startup_trek_2026/6.jpg",
  "/startup_trek_2026/7.jpg",
  "/startup_trek_2026/8.jpg",
];

// Zones keep the four images well separated: upper vs lower, left vs right.
// (left%, top%) — upper ~22–38%, lower ~62–78% (wide vertical gap); left ~6–14%, right ~82–94%
const LEFT_UPPER: [number, number][] = [
  [8, 26],
  [12, 32],
  [6, 38],
];
const LEFT_LOWER: [number, number][] = [
  [10, 76],
  [14, 72],
  [8, 68],
];
const RIGHT_UPPER: [number, number][] = [
  [88, 28],
  [92, 34],
  [86, 38],
];
const RIGHT_LOWER: [number, number][] = [
  [90, 76],
  [86, 72],
  [92, 68],
];

const CYCLE_MIN_MS = 1600;
const CYCLE_MAX_MS = 6400;
const POP_DURATION_MS = 380;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Pick 4 distinct indices from [0..length-1]. */
function pickFourDistinctIndices(length: number): [number, number, number, number] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return [indices[0], indices[1], indices[2], indices[3]];
}

/** Pick one index that is not in the excluded set. */
function pickIndexExcluding(length: number, excluded: Set<number>): number {
  const allowed = Array.from({ length }, (_, i) => i).filter((i) => !excluded.has(i));
  return allowed[Math.floor(Math.random() * allowed.length)] ?? 0;
}

const ZONE_POSITIONS = {
  left: { upper: LEFT_UPPER, lower: LEFT_LOWER },
  right: { upper: RIGHT_UPPER, lower: RIGHT_LOWER },
} as const;

function PoppingSlot({
  side,
  zone,
  imageIndex,
  onCycle,
}: {
  side: "left" | "right";
  zone: "upper" | "lower";
  imageIndex: number;
  onCycle: () => void;
}) {
  const positions = ZONE_POSITIONS[side][zone];
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<[number, number]>(() => pickRandom(positions));

  const onCycleRef = useRef(onCycle);
  onCycleRef.current = onCycle;
  const positionsRef = useRef(positions);
  positionsRef.current = positions;

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;
    let showTimer: ReturnType<typeof setTimeout>;
    let cycleTimer: ReturnType<typeof setTimeout>;
    let alive = true;

    const doCycle = () => {
      setIsVisible(false);
      fadeTimer = setTimeout(() => {
        if (!alive) return;
        onCycleRef.current();
        setPosition(pickRandom(positionsRef.current));
        showTimer = setTimeout(() => {
          if (!alive) return;
          setIsVisible(true);
        }, 40);
      }, POP_DURATION_MS);
    };

    const scheduleNext = () => {
      cycleTimer = setTimeout(() => {
        if (!alive) return;
        doCycle();
        scheduleNext();
      }, randomBetween(CYCLE_MIN_MS, CYCLE_MAX_MS));
    };

    const delay = randomBetween(300, 900);
    showTimer = setTimeout(() => {
      if (!alive) return;
      setIsVisible(true);
    }, delay);
    cycleTimer = setTimeout(() => {
      if (!alive) return;
      scheduleNext();
    }, delay + randomBetween(CYCLE_MIN_MS, CYCLE_MAX_MS));

    return () => {
      alive = false;
      clearTimeout(fadeTimer);
      clearTimeout(showTimer);
      clearTimeout(cycleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [left, top] = position;
  const src = IMAGE_POOL[imageIndex];

  return (
    <div
      className="absolute w-28 h-28 md:w-36 md:h-36 xl:w-40 xl:h-40 rounded-xl overflow-hidden bg-stone-200 shadow-lg pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.75})`,
        transition: `opacity ${POP_DURATION_MS}ms ease-out, transform ${POP_DURATION_MS}ms ease-out, left ${POP_DURATION_MS}ms ease-out, top ${POP_DURATION_MS}ms ease-out`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 112px, 160px"
      />
    </div>
  );
}

export function SpotlightImages() {
  const [indices, setIndices] = useState<[number, number, number, number]>(() =>
    pickFourDistinctIndices(IMAGE_POOL.length)
  );
  const indicesRef = useRef(indices);
  indicesRef.current = indices;

  const makeCycle = useCallback((slotIndex: 0 | 1 | 2 | 3) => {
    return () => {
      const current = indicesRef.current.slice() as [number, number, number, number];
      const excluded = new Set(current);
      const next = pickIndexExcluding(IMAGE_POOL.length, excluded);
      current[slotIndex] = next;
      indicesRef.current = current;
      setIndices(current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <PoppingSlot
        side="left"
        zone="upper"
        imageIndex={indices[0]}
        onCycle={makeCycle(0)}
      />
      <PoppingSlot
        side="left"
        zone="lower"
        imageIndex={indices[1]}
        onCycle={makeCycle(1)}
      />
      <PoppingSlot
        side="right"
        zone="upper"
        imageIndex={indices[2]}
        onCycle={makeCycle(2)}
      />
      <PoppingSlot
        side="right"
        zone="lower"
        imageIndex={indices[3]}
        onCycle={makeCycle(3)}
      />
    </div>
  );
}
