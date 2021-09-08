import * as React from 'react';

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 13 10" fill="none" {...props}>
      <path d="M.968 4.859L4.5 8.39 12 .89" stroke="currentColor" />
    </svg>
  );
}

export default React.memo(Check);
