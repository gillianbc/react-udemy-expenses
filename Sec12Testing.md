#Testing Notes

Basic jest test is of the form:

```aidl
test('Some description', () => {

```

The test suite passes if no error is thrown from within the callback function.
In the course, Andrew uses `test()` - I am more familiar with `it()` but that is simply an alias for `test()`.
https://jestjs.io/docs/en/api#testname-fn-timeout

## Running in Watch Mode from the Command Line

In package.json script, we can use `"test": "jest --watch",`to continually watch for changes to test files and anything they're importing.
If we `npm test --watch` at the command line, it will just run the tests then terminate.  That's because it's associatin `--watch` with the npm command rather than jest.
We need to do `npm test -- --watch`  The `--` means everything after it belongs to jest.  The same command can be used with yarn.


