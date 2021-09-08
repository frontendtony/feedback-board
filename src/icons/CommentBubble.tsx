import * as React from 'react';

function CommentBubble(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 18 16" fill="none" {...props}>
      <path
        d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.016 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
        fill="currentColor"
      />
    </svg>
  );
}

export default React.memo(CommentBubble);
