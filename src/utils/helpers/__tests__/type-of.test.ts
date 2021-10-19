import typeOf from '../type-of';

describe('utilities/type-of', () => {
  const types = {
    boolean: [true, false],
    number: [1],
    string: ['some string'],
    function: [Function.prototype, function () {}, () => {}],
    array: [[]],
    date: [new Date()],
    regexp: [new RegExp('some')],
    object: [{}],
    undefined: [undefined],
    null: [null],
  };

  Object.keys(types).forEach((type) => {
    describe(`when a ${type} is provided`, () => {
      types[type].forEach((item) => {
        it(`should return "${type}"`, () => {
          expect(typeOf(item)).toBe(type);
        });
      });
    });
  });
});
