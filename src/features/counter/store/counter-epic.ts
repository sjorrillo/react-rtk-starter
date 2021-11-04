import { of } from 'rxjs';
import { baseActionEpic } from '../../../core/store/base-epic';
import { actions } from './counter-slice';

// const delayTime = 1000

// export const EpicIncrement = (action$: Observable<PayloadAction<string>>, _store: StateObservable<IRootState>,
//   _dependencies: IEpicDependencies): Observable<AnyAction> => action$.pipe(
//   filter((action) => actions.ping.match(action)),
//   delay(delayTime),
//   concatMap((_action) => {
//     return of(actions.pong());
//   })
// );


export const EpicIncrement = baseActionEpic({
  START: actions.ping.type,
  COMPLETED: actions.pong.type,
}, (payload, dependencies, store) => {

  console.log('baseActionEpic', { payload, dependencies, store });
  return of({
    test: 'a',
  });
})