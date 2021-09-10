import { Transition } from '@headlessui/react';
import * as React from 'react';

export default function PageTransition(props: {
  children: React.ReactNode;
  action: 'PUSH' | 'POP' | 'REPLACE';
  uniqueKey: string;
}) {
  const up = '-translate-y-20 opacity-0';
  const down = 'translate-y-20 opacity-0';
  const center = 'translate-y-0 opacity-100';
  const transition = 'transition-all duration-150';

  return (
    <Transition
      show
      appear
      key={props.uniqueKey}
      enter={transition}
      enterFrom={props.action === 'PUSH' ? down : up}
      enterTo={center}
      leave={transition}
      leaveFrom={center}
      leaveTo={props.action === 'PUSH' ? up : down}
    >
      {props.children}
    </Transition>
  );
}
