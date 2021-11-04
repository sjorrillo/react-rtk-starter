import { PartialObserver, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { EventType, IMediatorEvent } from './event-types';

export default class Mediator {
  private static instance;
  private subject$: Subject<IMediatorEvent>;

  constructor() {
    this.subject$ = new Subject<IMediatorEvent>();
  }

  static create(): Mediator {
    if (this.instance) return this.instance;

    this.instance = new Mediator();
    return this.instance;
  }

  on = <TPayload = any>(event: EventType, action: PartialObserver<TPayload>): Subscription => {
    return this.subject$
      .pipe(
        filter((e) => e.type === event),
        map((e) => e.payload)
      )
      .subscribe(action);
  };

  emit = <TPayload = any>(type: EventType, payload?: TPayload) =>
    this.subject$.next({ type, payload });
}
