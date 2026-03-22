'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Timing constants (ms)
const PAUSE_BEFORE_START = 800;
const CURSOR_MOVE_DURATION = 600;
const HOVER_DURATION = 400;
const CLICK_DURATION = 200;
const STEP_TRANSITION = 400;
const TYPE_CHAR_DELAY = 100;
const PAUSE_BETWEEN_FIELDS = 300;
const RESULT_DISPLAY = 3000;
const PAUSE_BEFORE_RESET = 1500;

// Content constants
const CATEGORIES = [
  { id: 'fertilizer', label: 'Fertilizer & Soil' },
  { id: 'seeding', label: 'Seed & Planting' },
  { id: 'conversions', label: 'Conversions' },
  { id: 'livestock', label: 'Livestock' },
  { id: 'yield', label: 'Crop Yield' },
  { id: 'irrigation', label: 'Irrigation' },
];

const CALCULATORS = [
  { id: 'mulch', label: 'Mulch Calculator' },
  { id: 'soil', label: 'Soil Volume' },
  { id: 'compost', label: 'Compost Calculator' },
];

const TARGET_CATEGORY = 'conversions';
const TARGET_CALCULATOR = 'mulch';

type Step = 'category' | 'calculator' | 'input' | 'result';

export function HeroAnimation() {
  const [step, setStep] = useState<Step>('category');
  const [cursorPos, setCursorPos] = useState({ x: 200, y: 180 });
  const [isClicking, setIsClicking] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [typingField, setTypingField] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState({ area: '', depth: '' });
  const [showCaret, setShowCaret] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const mountedRef = useRef(true);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const wait = useCallback(
    (ms: number): Promise<void> =>
      new Promise((resolve) => {
        const t = setTimeout(() => {
          if (mountedRef.current) resolve();
        }, ms);
        timeoutsRef.current.push(t);
      }),
    []
  );

  const moveCursor = useCallback(
    async (x: number, y: number) => {
      setCursorPos({ x, y });
      await wait(CURSOR_MOVE_DURATION);
    },
    [wait]
  );

  const click = useCallback(async () => {
    setIsClicking(true);
    await wait(CLICK_DURATION);
    setIsClicking(false);
  }, [wait]);

  const typeText = useCallback(
    async (field: 'area' | 'depth', text: string) => {
      setTypingField(field);
      setShowCaret(true);
      for (let i = 0; i < text.length; i++) {
        if (!mountedRef.current) return;
        setFieldValues((prev) => ({
          ...prev,
          [field]: prev[field] + text[i],
        }));
        await wait(TYPE_CHAR_DELAY);
      }
      setShowCaret(false);
      setTypingField(null);
    },
    [wait]
  );

  const transitionStep = useCallback(
    async (next: Step) => {
      setFadeIn(false);
      await wait(STEP_TRANSITION);
      if (!mountedRef.current) return;
      setStep(next);
      setFadeIn(true);
    },
    [wait]
  );

  const runAnimation = useCallback(async () => {
    if (!mountedRef.current) return;

    // Reset
    setStep('category');
    setFadeIn(true);
    setFieldValues({ area: '', depth: '' });
    setHoveredId(null);
    setCursorPos({ x: 200, y: 180 });

    await wait(PAUSE_BEFORE_START);

    // Step 1: Choose category
    if (!mountedRef.current) return;
    await moveCursor(168, 148);
    setHoveredId(TARGET_CATEGORY);
    await wait(HOVER_DURATION);
    await click();
    await transitionStep('calculator');

    // Step 2: Choose calculator
    if (!mountedRef.current) return;
    setHoveredId(null);
    await moveCursor(170, 100);
    await wait(200);
    setHoveredId(TARGET_CALCULATOR);
    await wait(HOVER_DURATION);
    await click();
    await transitionStep('input');

    // Step 3: Enter measurements
    if (!mountedRef.current) return;
    setHoveredId(null);
    await moveCursor(200, 106);
    await click();
    await typeText('area', '500');
    await wait(PAUSE_BETWEEN_FIELDS);

    if (!mountedRef.current) return;
    await moveCursor(200, 160);
    await click();
    await typeText('depth', '3');
    await wait(PAUSE_BETWEEN_FIELDS);

    // Click calculate
    if (!mountedRef.current) return;
    await moveCursor(170, 210);
    setHoveredId('calculate');
    await wait(HOVER_DURATION);
    await click();
    setHoveredId(null);
    await transitionStep('result');

    // Step 4: Show results
    if (!mountedRef.current) return;
    await wait(RESULT_DISPLAY);
    await wait(PAUSE_BEFORE_RESET);

    // Loop
    if (mountedRef.current) {
      runAnimation();
    }
  }, [wait, moveCursor, click, typeText, transitionStep]);

  useEffect(() => {
    mountedRef.current = true;
    runAnimation();
    return () => {
      mountedRef.current = false;
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const breadcrumb =
    step === 'calculator' || step === 'input' || step === 'result'
      ? 'Conversions'
      : null;
  const breadcrumb2 =
    step === 'input' || step === 'result' ? 'Mulch Calculator' : null;

  return (
    <div className="pointer-events-none relative select-none">
      <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {/* Header bar */}
        <div className="flex items-center gap-2 border-b border-border bg-accent/60 px-4 py-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-white">
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="16" y2="10" />
              <line x1="8" y1="14" x2="12" y2="14" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-foreground">
            AgroRates Calculator
          </span>
        </div>

        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="flex items-center gap-1 border-b border-border/60 px-4 py-1.5">
            <span className="rounded bg-primary-light px-1.5 py-0.5 text-2xs font-medium text-primary">
              {breadcrumb}
            </span>
            {breadcrumb2 && (
              <>
                <svg
                  className="h-3 w-3 text-muted"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span className="rounded bg-primary-light px-1.5 py-0.5 text-2xs font-medium text-primary">
                  {breadcrumb2}
                </span>
              </>
            )}
          </div>
        )}

        {/* Content area */}
        <div
          className={`relative px-4 py-4 transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
          style={{ minHeight: 220 }}
        >
          {step === 'category' && (
            <div className="animate-fade-in">
              <p className="mb-3 text-2xs font-semibold uppercase tracking-widest text-muted">
                Choose a category
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className={`rounded-lg border px-2.5 py-2 text-center text-2xs font-medium transition-all duration-200 ${
                      hoveredId === cat.id
                        ? 'border-primary/40 bg-primary-light text-primary'
                        : 'border-border bg-white text-foreground'
                    }`}
                  >
                    {cat.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'calculator' && (
            <div className="animate-fade-in">
              <p className="mb-3 text-2xs font-semibold uppercase tracking-widest text-muted">
                Select calculator
              </p>
              <div className="space-y-1.5">
                {CALCULATORS.map((calc) => (
                  <div
                    key={calc.id}
                    className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-all duration-200 ${
                      hoveredId === calc.id
                        ? 'border-primary/40 bg-primary-light text-primary'
                        : 'border-border bg-white text-foreground'
                    }`}
                  >
                    {calc.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'input' && (
            <div className="animate-fade-in">
              <p className="mb-3 text-2xs font-semibold uppercase tracking-widest text-muted">
                Enter measurements
              </p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-2xs font-medium text-muted">
                    Area (sq ft)
                  </label>
                  <div
                    className={`flex items-center rounded-lg border px-3 py-2 text-xs ${
                      typingField === 'area'
                        ? 'border-primary/50 ring-2 ring-primary/10'
                        : 'border-border'
                    }`}
                  >
                    <span className="text-foreground">
                      {fieldValues.area}
                    </span>
                    {typingField === 'area' && showCaret && (
                      <span className="ml-px animate-blink text-primary">
                        |
                      </span>
                    )}
                    {!fieldValues.area && typingField !== 'area' && (
                      <span className="text-stone-300">e.g. 500</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-2xs font-medium text-muted">
                    Depth (inches)
                  </label>
                  <div
                    className={`flex items-center rounded-lg border px-3 py-2 text-xs ${
                      typingField === 'depth'
                        ? 'border-primary/50 ring-2 ring-primary/10'
                        : 'border-border'
                    }`}
                  >
                    <span className="text-foreground">
                      {fieldValues.depth}
                    </span>
                    {typingField === 'depth' && showCaret && (
                      <span className="ml-px animate-blink text-primary">
                        |
                      </span>
                    )}
                    {!fieldValues.depth && typingField !== 'depth' && (
                      <span className="text-stone-300">e.g. 3</span>
                    )}
                  </div>
                </div>
                <div
                  className={`rounded-lg px-3 py-2 text-center text-xs font-semibold text-white transition-all duration-200 ${
                    hoveredId === 'calculate'
                      ? 'bg-primary-hover'
                      : 'bg-primary'
                  }`}
                >
                  Calculate Materials
                </div>
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="animate-fade-in">
              <p className="mb-3 text-2xs font-semibold uppercase tracking-widest text-muted">
                Results
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 rounded-lg bg-primary-light px-3 py-2.5">
                  <svg
                    className="h-4 w-4 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-xs font-bold text-primary">
                    4.6 cubic yards
                  </span>
                  <span className="text-xs text-muted">of mulch</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-primary-light px-3 py-2.5">
                  <svg
                    className="h-4 w-4 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-xs font-bold text-primary">
                    63 bags
                  </span>
                  <span className="text-xs text-muted">(2 cu ft each)</span>
                </div>
                <div className="mt-1 flex items-start gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                  <svg
                    className="mt-0.5 h-3 w-3 shrink-0 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span className="text-2xs leading-relaxed text-amber-700">
                    Add 10-15% extra for settling and edges.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Cursor */}
          <div
            className="absolute z-10 transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transitionDuration: `${CURSOR_MOVE_DURATION}ms`,
            }}
          >
            {/* Cursor SVG */}
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              className={`drop-shadow-md transition-transform duration-100 ${isClicking ? 'scale-90' : 'scale-100'}`}
            >
              <path
                d="M0 0L0 16.5L4.5 12.5L7.5 19L10.5 17.5L7.5 11L13 11L0 0Z"
                fill="#1c1917"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
            {/* Click ping */}
            {isClicking && (
              <div className="absolute -left-2 -top-2 h-5 w-5 animate-ping rounded-full bg-primary/30" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
