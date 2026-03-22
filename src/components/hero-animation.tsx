'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const PAUSE_BEFORE_START = 800;
const CURSOR_MOVE_DURATION = 600;
const HOVER_DURATION = 400;
const CLICK_DURATION = 200;
const STEP_TRANSITION = 400;
const TYPE_CHAR_DELAY = 100;
const PAUSE_BETWEEN_FIELDS = 300;
const RESULT_DISPLAY = 3000;
const PAUSE_BEFORE_RESET = 1500;

const CATEGORIES = [
  { id: 'fertilizer', label: 'Fertilizer', icon: 'M14 9.5V7a4 4 0 014-4h1.5a.5.5 0 01.5.5V5a4 4 0 01-4 4 4 4 0 00-4 4c0 2 1 3 1 5a5 5 0 01-1 3M4 9a5 5 0 018 4 5 5 0 01-8-4M5 21h14' },
  { id: 'seeding', label: 'Seeding', icon: 'M2 22l1-1h3l9-9M3 21v-3l9-9M14.5 5.5l4-4M18.5 1.5l4 4' },
  { id: 'conversions', label: 'Conversions', icon: 'M8 3L4 7l4 4M16 21l4-4-4-4M4 7h16M20 17H4' },
  { id: 'livestock', label: 'Livestock', icon: 'M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4zM6 21v-2a6 6 0 0112 0v2' },
];

const CALCULATORS = [
  { id: 'mulch', label: 'Mulch Calculator', desc: 'Cubic yards & bags' },
  { id: 'soil', label: 'Soil Volume', desc: 'Raised beds & fill' },
  { id: 'compost', label: 'Compost Calculator', desc: 'Volume & weight' },
];

type Step = 'category' | 'calculator' | 'input' | 'result';

export function HeroAnimation() {
  const [step, setStep] = useState<Step>('category');
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isClicking, setIsClicking] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [typingField, setTypingField] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState({ area: '', depth: '' });
  const [showCaret, setShowCaret] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
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
        setFieldValues((prev) => ({ ...prev, [field]: prev[field] + text[i] }));
        await wait(TYPE_CHAR_DELAY);
      }
      setShowCaret(false);
      setTypingField(null);
    },
    [wait]
  );

  const transitionStep = useCallback(
    async (next: Step, stepIdx: number) => {
      setFadeIn(false);
      await wait(STEP_TRANSITION);
      if (!mountedRef.current) return;
      setStep(next);
      setActiveStep(stepIdx);
      setFadeIn(true);
    },
    [wait]
  );

  const runAnimation = useCallback(async () => {
    if (!mountedRef.current) return;

    setStep('category');
    setFadeIn(true);
    setActiveStep(0);
    setFieldValues({ area: '', depth: '' });
    setHoveredId(null);
    setCursorPos({ x: 50, y: 50 });

    await wait(PAUSE_BEFORE_START);

    // Step 1: Choose category — target "Conversions" (3rd item, index 2)
    if (!mountedRef.current) return;
    await moveCursor(105, 158);
    setHoveredId('conversions');
    await wait(HOVER_DURATION);
    await click();
    await transitionStep('calculator', 1);

    // Step 2: Choose calculator — target "Mulch" (1st item)
    if (!mountedRef.current) return;
    setHoveredId(null);
    await moveCursor(140, 88);
    await wait(200);
    setHoveredId('mulch');
    await wait(HOVER_DURATION);
    await click();
    await transitionStep('input', 2);

    // Step 3: Type area
    if (!mountedRef.current) return;
    setHoveredId(null);
    await moveCursor(160, 100);
    await click();
    await typeText('area', '500');
    await wait(PAUSE_BETWEEN_FIELDS);

    // Type depth
    if (!mountedRef.current) return;
    await moveCursor(160, 158);
    await click();
    await typeText('depth', '3');
    await wait(PAUSE_BETWEEN_FIELDS);

    // Click calculate
    if (!mountedRef.current) return;
    await moveCursor(140, 212);
    setHoveredId('calculate');
    await wait(HOVER_DURATION);
    await click();
    setHoveredId(null);
    await transitionStep('result', 3);

    // Step 4: Results
    if (!mountedRef.current) return;
    await wait(RESULT_DISPLAY);
    await wait(PAUSE_BEFORE_RESET);

    if (mountedRef.current) runAnimation();
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

  const steps = ['Category', 'Calculator', 'Input', 'Result'];

  return (
    <div className="pointer-events-none relative select-none">
      {/* Glow effect behind card */}
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 blur-xl" />

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9.536V7a4 4 0 014-4h1.5a.5.5 0 01.5.5V5a4 4 0 01-4 4 4 4 0 00-4 4c0 2 1 3 1 5a5 5 0 01-1 3" />
                <path d="M4 9a5 5 0 018 4 5 5 0 01-8-4" />
                <path d="M5 21h14" />
              </svg>
            </div>
            <span className="text-[0.8125rem] font-semibold text-foreground">AgroRates</span>
          </div>
          {/* Window dots */}
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-stone-200" />
            <div className="h-2.5 w-2.5 rounded-full bg-stone-200" />
            <div className="h-2.5 w-2.5 rounded-full bg-stone-200" />
          </div>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-0 border-b border-border/40 bg-accent/30 px-5 py-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex items-center gap-1.5">
                <div className={`flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold transition-colors duration-300 ${
                  i <= activeStep ? 'bg-primary text-white' : 'bg-stone-200 text-stone-400'
                }`}>
                  {i < activeStep ? (
                    <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-[10px] font-medium transition-colors duration-300 ${
                  i <= activeStep ? 'text-foreground' : 'text-stone-400'
                }`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-2 h-px w-4 transition-colors duration-300 ${
                  i < activeStep ? 'bg-primary/40' : 'bg-stone-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div
          className={`relative overflow-hidden px-5 py-5 transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
          style={{ height: 260 }}
        >
          {step === 'category' && (
            <div className="animate-fade-in">
              <p className="mb-1 text-[0.8125rem] font-semibold text-foreground">Choose a category</p>
              <p className="mb-4 text-2xs text-muted">Select the type of calculator you need</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all duration-200 ${
                      hoveredId === cat.id
                        ? 'border-primary/50 bg-primary-light shadow-sm'
                        : 'border-border bg-white'
                    }`}
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                      hoveredId === cat.id ? 'bg-primary/10' : 'bg-accent'
                    }`}>
                      <svg
                        className={`h-3.5 w-3.5 transition-colors duration-200 ${
                          hoveredId === cat.id ? 'text-primary' : 'text-muted'
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={cat.icon} />
                      </svg>
                    </div>
                    <span className={`text-xs font-medium transition-colors duration-200 ${
                      hoveredId === cat.id ? 'text-primary' : 'text-foreground'
                    }`}>
                      {cat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'calculator' && (
            <div className="animate-fade-in">
              <p className="mb-1 text-[0.8125rem] font-semibold text-foreground">Conversions</p>
              <p className="mb-4 text-2xs text-muted">Pick a calculator</p>
              <div className="space-y-2">
                {CALCULATORS.map((calc) => (
                  <div
                    key={calc.id}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-3 transition-all duration-200 ${
                      hoveredId === calc.id
                        ? 'border-primary/50 bg-primary-light shadow-sm'
                        : 'border-border bg-white'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-semibold transition-colors duration-200 ${
                        hoveredId === calc.id ? 'text-primary' : 'text-foreground'
                      }`}>
                        {calc.label}
                      </p>
                      <p className="text-[10px] text-muted">{calc.desc}</p>
                    </div>
                    <svg
                      className={`h-3.5 w-3.5 transition-colors duration-200 ${
                        hoveredId === calc.id ? 'text-primary' : 'text-stone-300'
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'input' && (
            <div className="animate-fade-in">
              <p className="mb-1 text-[0.8125rem] font-semibold text-foreground">Mulch Calculator</p>
              <p className="mb-4 text-2xs text-muted">Enter your measurements</p>
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-muted">
                    <span>Area</span>
                    <span className="text-stone-300">sq ft</span>
                  </label>
                  <div className={`flex items-center rounded-lg border bg-white px-3 py-2.5 text-xs transition-all duration-200 ${
                    typingField === 'area'
                      ? 'border-primary/50 ring-2 ring-primary/10 shadow-sm'
                      : 'border-border'
                  }`}>
                    <span className="font-medium text-foreground">{fieldValues.area}</span>
                    {typingField === 'area' && showCaret && (
                      <span className="ml-px animate-blink font-light text-primary">|</span>
                    )}
                    {!fieldValues.area && typingField !== 'area' && (
                      <span className="text-stone-300">500</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-muted">
                    <span>Depth</span>
                    <span className="text-stone-300">inches</span>
                  </label>
                  <div className={`flex items-center rounded-lg border bg-white px-3 py-2.5 text-xs transition-all duration-200 ${
                    typingField === 'depth'
                      ? 'border-primary/50 ring-2 ring-primary/10 shadow-sm'
                      : 'border-border'
                  }`}>
                    <span className="font-medium text-foreground">{fieldValues.depth}</span>
                    {typingField === 'depth' && showCaret && (
                      <span className="ml-px animate-blink font-light text-primary">|</span>
                    )}
                    {!fieldValues.depth && typingField !== 'depth' && (
                      <span className="text-stone-300">3</span>
                    )}
                  </div>
                </div>
                <div className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-white transition-all duration-200 ${
                  hoveredId === 'calculate' ? 'bg-primary-hover shadow-md' : 'bg-primary shadow-sm'
                }`}>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                    <line x1="8" y1="14" x2="12" y2="14" />
                  </svg>
                  Calculate
                </div>
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="animate-fade-in">
              <p className="mb-1 text-[0.8125rem] font-semibold text-foreground">Your results</p>
              <p className="mb-4 text-2xs text-muted">For 500 sq ft at 3 inches deep</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary-light px-3.5 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">4.6 cubic yards</p>
                    <p className="text-[10px] text-primary/70">of mulch needed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary-light px-3.5 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">63 bags</p>
                    <p className="text-[10px] text-primary/70">at 2 cu ft per bag</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50/80 px-3.5 py-2.5">
                  <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="text-[10px] leading-relaxed text-amber-700">
                    Add 10-15% extra for settling and edges
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
            <svg
              width="18"
              height="22"
              viewBox="0 0 16 20"
              fill="none"
              className={`drop-shadow-lg transition-transform duration-100 ${isClicking ? 'scale-90' : 'scale-100'}`}
            >
              <path
                d="M0 0L0 16.5L4.5 12.5L7.5 19L10.5 17.5L7.5 11L13 11L0 0Z"
                fill="#1c1917"
                stroke="white"
                strokeWidth="1.2"
              />
            </svg>
            {isClicking && (
              <div className="absolute -left-2 -top-2 h-6 w-6 animate-ping rounded-full bg-primary/25" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
