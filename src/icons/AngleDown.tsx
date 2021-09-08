import * as React from 'react';

function AngleDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 9 7" fill="none" {...props}>
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth={2} />
    </svg>
  );
}

export default React.memo(AngleDown);
