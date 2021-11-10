import React from 'react';
import t from '../../core/modules/i18n';

import { useAppDispatch, useAppSelector } from '../../utils/ui/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  ping,
  selectCount,
  useGetPokemonByNameQuery,
} from './store';
import styles from './Counter.module.css';
import { FormatMessage } from '../../components/format-message';

function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = React.useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const { data, error, isLoading, ...rest } = useGetPokemonByNameQuery('bulbasaur');

  // eslint-disable-next-line no-console
  console.log('useGetPokemonByNameQuery', { data, error, isLoading, ...rest });

  return (
    <div>
      <div>
        This is a normal message
        <br />
        {t('Advanced Search')}
        <br />
        {t('All |name|', { name: 'javier orrillo'})}
        <br />
        <FormatMessage
          elements={{
            br: <br />
          }}
          path="There was an error loading the invoice. Please refresh your browser and try again.[br][br]If this issue persists, contact ABC Support."
        />
        <br />
        <br />

        <FormatMessage
          elements={{
            folderName: 'folder',
            itemName: 'item',
            strong: <strong />,
            br: <br />
          }}
          path="Are you sure you want to move [strong]|itemName|[strong] to folder [strong]|folderName|[strong]? Some users may lose access."
        />

      </div>
      <div className={styles.row}>
        <button
          aria-label="Decrement value"
          className={styles.button}
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          aria-label="Increment value"
          className={styles.button}
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          aria-label="Set increment amount"
          className={styles.textbox}
          onChange={(e) => setIncrementAmount(e.target.value)}
          value={incrementAmount}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(ping())}
        >
          Add Async 10
        </button>
      </div>
    </div>
  );
}

export default Counter;
