import { useEffect } from 'react';
import { buffer, filter, tap, map, debounceTime } from 'rxjs';

export function useClick(mouseClicks$, setState) {
    useEffect(() => {
      if (!mouseClicks$) return;
      const subject$ = mouseClicks$
        .pipe(
          buffer(mouseClicks$.pipe(debounceTime(300))),
          tap((e) => console.log(e)),
          map((e) => e.length),
          filter((e) => e === 2),
        )
        .subscribe((e) => setState(false));
      return () => subject$.unsubscribe();
    }, [mouseClicks$, setState]);
  }