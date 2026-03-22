'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqSectionProps = {
  faqs: { question: string; answer: string }[];
};

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-border rounded-lg border border-border bg-white">
        {faqs.map((faq, i) => (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-accent/50"
            >
              <span className="text-sm font-medium text-foreground">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4">
                <p className="text-sm leading-relaxed text-foreground/70">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
