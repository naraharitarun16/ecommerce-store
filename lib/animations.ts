'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
}

export function staggerChildren(container: HTMLElement | null, delay = 50) {
  if (!container) return;

  const children = container.querySelectorAll('[data-stagger]');
  children.forEach((child, index) => {
    const element = child as HTMLElement;
    element.style.animationDelay = `${index * delay}ms`;
  });
}
