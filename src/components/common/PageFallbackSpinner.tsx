import React from 'react';
import Spinner from '../primitives/Spinner';

export default function PageFallbackSpinner() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner className="text-6xl text-primary" />
    </div>
  );
}
