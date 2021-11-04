import { act, renderHook } from '@testing-library/react-hooks'
import { useBoolean } from '../use-boolean';

describe('hooks/useBoolean', () => {

  it('Should validate the initial value as false', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBe(false);
  });

  it('Should validate the initial value as true', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBe(false);
  });

  describe('When on callack is called', () => {
    it('Should set the value to true', () => {
      const { result } = renderHook(() => useBoolean());
      act(() => {
        result.current[1].on();
      });
      expect(result.current[0]).toBe(true);
    });
  });

  describe('When off callack is called', () => {
    it('Should set the value to true', () => {
      const { result } = renderHook(() => useBoolean(true));
      act(() => {
        result.current[1].off();
      });
      expect(result.current[0]).toBe(false);
    });
  });

  describe('When set callack is called', () => {
    it('Should set the value to true', () => {
      const { result } = renderHook(() => useBoolean(true));
      act(() => {
        result.current[1].set(false);
      });
      expect(result.current[0]).toBe(false);
    });
  });

  describe('When toogle callack is called', () => {
    it('Should set the value to true', () => {
      const { result } = renderHook(() => useBoolean(true));
      act(() => {
        result.current[1].toggle();
      });
      expect(result.current[0]).toBe(false);
      act(() => {
        result.current[1].toggle();
      });
      expect(result.current[0]).toBe(true);
    });
  });
});
