describe('Example test suite', () => {
  let value: number;

  beforeAll(() => {
    console.log('→ Before all tests');
    value = 10;
  });

  afterAll(() => {
    console.log('→ After all tests');
  });

  test('value should be initialized', () => {
    expect(value).toBe(10);
  });
});
