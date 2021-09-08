import * as React from 'react';

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" {...props}>
      <path
        d="M7.673 11.714V7.547h4.062V4.474H7.673V.286H4.39v4.188H.286v3.073H4.39v4.167h3.283z"
        fill="currentColor"
      />
    </svg>
  );
}

export default React.memo(Plus);
