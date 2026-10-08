
'use client';

import { useState, useEffect, useCallback } from 'react';

// A simple in-memory store for the shared counter state
let countState = 10621; // Initial value requested by user
const listeners = new Set<(count: number) => void>();

// Function to update the state and notify all listeners
const setCount = (updater: (prev: number) => number) => {
  countState = updater(countState);
  listeners.forEach((listener) => listener(countState));
};

// Export a function to increment the count, which can be called from anywhere
export const incrementCount = () => {
    setCount(prev => prev + 1);
};

// The hook itself subscribes to the shared state
export function useSharedCounter() {
  const [count, setLocalCount] = useState(countState);

  useEffect(() => {
    const listener = (newCount: number) => {
      setLocalCount(newCount);
    };
    
    listeners.add(listener);
    // Sync with the current state on mount
    setLocalCount(countState); 

    // Cleanup on unmount
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return count;
}
