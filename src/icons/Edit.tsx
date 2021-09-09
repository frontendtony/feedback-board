import * as React from 'react';

function Edit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.082 3.48L16.832 0l6.513 6.272-3.548 3.68-6.715-6.471zM0 23.596c.92-3.942 3.487-14.02 3.487-14.02l8.203-4.821 6.83 6.396-5.218 7.82L.313 24l6.157-5.79c1.043.39 2.516.038 3.312-.836a2.818 2.818 0 00-.177-3.983c-1.149-1.05-3.02-1.05-4.071.098-.783.855-1.053 2.365-.605 3.36L0 23.596z"
        fill="currentColor"
      />
    </svg>
  );
}

export default React.memo(Edit);
