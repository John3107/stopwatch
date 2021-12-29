import { useEffect, useState } from 'react';
import {fromEvent} from 'rxjs';

export function useObservable(ref, event) {
    const [subject$, setSubject$] = useState();
    useEffect(() => {
      if (!ref.current) return;
      setSubject$(fromEvent(ref.current, event));
    }, [ref, event]);
    return subject$;
  }