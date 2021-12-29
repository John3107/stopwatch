import './App.css';
import { useEffect, useRef, useState } from 'react';
import { useObservable } from './functions/useObservable';
import { useClick } from './functions/useClick';
import { interval, Subject, takeUntil } from 'rxjs';


function App() {
  const [time, setTime] = useState(0);
  const [enabled, setEnabled] = useState(false);

  const ref = useRef(null);
  const clicks$ = useObservable(ref, 'click');
  useClick(clicks$, setEnabled, enabled);

  const unsubscribe$ = new Subject();
  const timer$ = interval(1000).pipe(takeUntil(unsubscribe$));

  useEffect(() => {
    timer$.subscribe(() => {
      if (enabled) {
        setTime((val) => val + 1);
      }
    });

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [enabled, timer$, unsubscribe$]);

  function start() {
    setEnabled(true);
  }

  function stop() {
    setEnabled(false);
    setTime(0);
  }

  function reset() {
    setTime(0);
  }

  return (
    <div className="app">
      <div className="table">
        <span>{('0' + Math.floor((time / 3600) % 60)).slice(-2)}</span>
        &nbsp;:&nbsp;
        <span>{('0' + Math.floor((time / 60) % 60)).slice(-2)}</span>
        &nbsp;:&nbsp;
        <span>{('0' + Math.floor(time % 60)).slice(-2)}</span>
      </div>
      <div className="buttons">
        <button
          onClick={enabled ? stop : start}
          className={enabled ? 'stop' : ''}
          title={enabled ? 'Stop' : 'Start'}
        >
          {enabled ? (
            <span>stop</span>
          ) : (
            <span>start</span>
          )}
        </button>
        <button ref={ref} title="Wait">
          <span>pause</span>
        </button>
        <button onClick={reset} title="Reset">
          <span>reset</span>
        </button>
      </div>
    </div>
  );
}

export default App;
