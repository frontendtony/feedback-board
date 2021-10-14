import { Transition } from '@headlessui/react';
import React, { useEffect, useRef } from 'react';
// @ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/react';

// replaced dynamically
const buildDate = '__DATE__';
// replaced dyanmicaly
const reloadSW = '__RELOAD_SW__';

function ReloadPrompt() {
  const reloadButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement>();

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: any) {
      // @ts-ignore
      if (reloadSW === 'true') {
        r &&
          setInterval(() => {
            console.log('Checking for sw update');
            r.update();
          }, 20000 /* 20s for testing purposes */);
      } else {
        // eslint-disable-next-line prefer-template
        console.log('SW Registered: ' + r);
      }
    },
    onRegisterError(error: any) {
      console.log('SW registration error', error);
    },
  });

  const reload = () => {
    updateServiceWorker();
    setNeedRefresh(false);

    previouslyFocusedElement.current?.focus();
  };

  const cancel = () => {
    setNeedRefresh(false);

    previouslyFocusedElement.current?.focus();
  };

  // Prevent tabbing to other elements outside the notification box, i.e. focus trapping
  useEffect(() => {
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();

        if (document.activeElement === reloadButtonRef.current) {
          cancelButtonRef.current?.focus();
        } else {
          reloadButtonRef.current?.focus();
        }
      }
    };

    if (needRefresh) {
      previouslyFocusedElement.current = (document.activeElement as HTMLElement) || undefined;
      reloadButtonRef.current?.focus();

      document.addEventListener('keydown', trapFocus);

      return () => document.removeEventListener('keydown', trapFocus);
    }
  }, [needRefresh]);

  return (
    <div className="h-0 w-0 p-0 m-0">
      <Transition
        as="div"
        appear
        show={needRefresh}
        key="service-worker-update-notification"
        className="bg-white rounded p-4 shadow-dropdown fixed bottom-4 right-4 ml-4 max-w-sm z-50"
        role="region"
        enter="transition-transform duration-150"
        enterFrom="translate-y-full"
        enterTo="translate-y-0"
        leave="transition-transform duration-150"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
      >
        <p aria-live="polite">New update available, click on reload button to update</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="btn secondary" onClick={cancel} ref={cancelButtonRef}>
            Cancel
          </button>
          <button className="btn primary" onClick={reload} ref={reloadButtonRef}>
            Reload
          </button>
        </div>
      </Transition>
      <div className="invisible">{buildDate}</div>
    </div>
  );
}

export default ReloadPrompt;
