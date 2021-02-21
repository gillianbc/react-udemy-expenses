#Testing Notes

Basic jest test is of the form:

```
test('Some description', () => {

```

The test suite passes if no error is thrown from within the callback function.
In the course, Andrew uses `test()` - I am more familiar with `it()` but that is simply an alias for `test()`.
https://jestjs.io/docs/en/api#testname-fn-timeout

## Running in Watch Mode from the Command Line

In package.json script, we can use `"test": "jest --watch",`to continually watch for changes to test files and anything they're importing.
If we `npm test --watch` at the command line, it will just run the tests then terminate.  That's because it's associatin `--watch` with the npm command rather than jest.
We need to do `npm test -- --watch`  The `--` means everything after it belongs to jest.  The same command can be used with yarn.

# Testing React Components
For all features that are not just normal functions, we need to test what gets rendered.  We use react-test-renderer.
This has a shallow and a full-dom option.  Shallow is for when we just want to test what gets rendered as opposed to lifecycle events, user-interaction.

We don't assert on the rendered output line by line.  We use a snapshot.  The first time the test runs, it will always pass.  Jest creates a snapshot of the rendered
output in a `__snapshot__` folder below your test.  You can view this file to check it's what you expect.  When the test is subsequently run, jest will find the
snapshot and if anything has changed from the original snapshot, the test will fail.

You then have choice:
- fix it if there's an issue
- if it's correct because legitimate changes have occurred, select `u` to update the snapshot
```
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 updated, 1 total

```
