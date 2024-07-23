'use client';
import NextNProgressProps from 'nextjs-progressbar';
import { Suspense } from 'react';

function RouteProgress() {
  return (
    <Suspense fallback={null}>
      <NextNProgressProps
        height={3}
        startPosition={0.3}
        stopDelayMs={200}
        color="#00ccff"
        options={{ easing: 'ease', speed: 500 }}
        showOnShallow={true}
      />
    </Suspense>
  );
}

export default RouteProgress;
