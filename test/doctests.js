import('@linus/testy').then(({ testy }) => {
  describe('Test', () => {
    testy('lib/diff.js');
  });
});
