import { render } from '@testing-library/react';
import { usePrevious } from '../use-previous';

describe('hooks/usePrevious', () => {

  it('Should validate the previous value', () => {
    let value = 0;
    let prevValue;
    const TestComponent: React.FC = () => {
      value++;
      prevValue = usePrevious(value);
      return null;
    };

    const result = render(<TestComponent />);
    expect(value).toBe(1);
    expect(prevValue).toBeUndefined();

    result.rerender(<TestComponent />)

    expect(value).toBe(2);
    expect(prevValue).toBe(1);
  });
});
