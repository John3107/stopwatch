import { useEffect } from 'react';
import { buffer, filter, map, asyncScheduler } from 'rxjs';
import { throttleTime } from "rxjs/operators";

export function useClick(mouseClicks$, setState) {
    useEffect(() => {
      if (!mouseClicks$) return;
      const subject$ = mouseClicks$
        .pipe(
          buffer(mouseClicks$.pipe(throttleTime(300, asyncScheduler, {
            leading: false,
            trailing: true,
          }))),
          map((e) => e.length),
          filter((e) => e === 2),
        )
        .subscribe((e) => setState(false));
      return () => subject$.unsubscribe();
    }, [mouseClicks$, setState]);
  }