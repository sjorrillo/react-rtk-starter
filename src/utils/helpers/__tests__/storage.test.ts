import { clearStorage, getCombinedKey, setInStorage } from '../storage';

describe('storage/ls', () => {
  const KEY = 'foo';
  const VALUE = 'far';

  describe('when tries to persist data locally', () => {
    it('should save to localStorage', () => {
      setInStorage(KEY, VALUE);

      const combinedKey = getCombinedKey(KEY);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(combinedKey, JSON.stringify(VALUE));
      expect(localStorage.__STORE__[combinedKey]).toBe(JSON.stringify(VALUE));
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });
  });

  describe('when tries to remove all persisted data locally', () => {
    it('should have cleared localStorage', () => {
      setInStorage(KEY, VALUE);
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);

      clearStorage();

      expect(localStorage.clear).toHaveBeenCalledTimes(1);
      expect(localStorage.__STORE__).toEqual({});
      expect(localStorage.length).toBe(0);
    });
  });
});
