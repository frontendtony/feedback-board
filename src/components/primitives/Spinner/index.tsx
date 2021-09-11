import * as React from 'react';
import classes from './index.module.css';

function Spinner(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" width="1em" viewBox="0 0 56 56" {...props}>
      <g className={classes.g}>
        <circle cx="28" cy="28" r="16" className={classes.circle} />
      </g>
    </svg>
  );
}

export default Spinner;
