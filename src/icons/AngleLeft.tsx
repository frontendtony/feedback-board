import * as React from 'react';

function AngleLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 5 10" fill="none" {...props}>
      <path d="M4 9L0 5l4-4" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

export default React.memo(AngleLeft);
