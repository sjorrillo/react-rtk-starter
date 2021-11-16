import { baseActionEpic } from '../../../core/store/base-epic';
import { actions } from './counter-slice';

export const EpicIncrement = baseActionEpic(
  {
    START: actions.ping.type,
    COMPLETED: actions.pong.type,
  },
  (payload, { client, buildSecurityUrl }, store) => {
    console.log('EpicIncrement', { payload, store });
    // error: users/23
    // success: users/2
    return client.get(buildSecurityUrl('/users/23'));
  }
);
