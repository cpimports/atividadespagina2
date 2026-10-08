
'use client';

import { useState, useEffect, RefObject } from 'react';

// This hook animates the progress bar to targetProgress (default 87%) when it becomes visible,
// and then continues to increment slowly.
export function useProgress(ref: RefObject<Element>, targetProgress = 87) {
  const [progress, setProgress] = useState(0);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target); // Stop observing once it's visible
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (isIntersecting) {
      // Animate smoothly to targetProgress (87%)
      setProgress(targetProgress);

      // After the initial animation, start the slow increment up to 96%
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 96) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 35000);

      return () => clearInterval(interval);
    }
  }, [isIntersecting, targetProgress]);

  return progress;
}
