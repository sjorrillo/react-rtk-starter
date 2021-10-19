// eslint-disable-next-line import/no-anonymous-default-export
export default <TType>(value: TType | undefined | null): boolean =>
  typeof value === 'undefined' || value === null;
