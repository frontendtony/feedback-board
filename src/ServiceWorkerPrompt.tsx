import React from 'react';
import { toast, ToastBar, Toaster } from 'react-hot-toast';
// @ts-ignore
import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  // replaced dynamically
  const buildDate = '__DATE__';
  // replaced dyanmicaly
  const reloadSW = '__RELOAD_SW__';

  const {
    offlineReady: [offlineReady, setOfflineReady],
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

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className="h-0 w-0 p-0 m-0">
      {offlineReady || needRefresh ? (
        <Toaster>
          {(t) => (
            <ToastBar toast={t} position="bottom-right">
              {() => (
                <>
                  {offlineReady ? (
                    <span>App ready to work offline</span>
                  ) : (
                    <span>New content available, click on reload button to update.</span>
                  )}
                  {t.type !== 'loading' && <button onClick={() => toast.dismiss(t.id)}>X</button>}
                  <div className="flex space-x-4 justify-end mt-2">
                    <button className="btn secondary small" onClick={close}>
                      Close
                    </button>
                    {needRefresh && (
                      <button className="btn primary small" onClick={updateServiceWorker}>
                        Reload
                      </button>
                    )}
                  </div>
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
      ) : null}
      <div className="invisible">{buildDate}</div>
    </div>
  );
}

export default ReloadPrompt;
