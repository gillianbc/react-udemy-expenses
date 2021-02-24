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
# Enzyme

We needed 3 packages for this - enzyme, an adapter and raf (request animation frame) which is a browser polyfill.  
We get this configured in a single setup file for our tests

https://enzymejs.github.io/enzyme/

We then need to configure jest to use our enzyme config file:

https://jestjs.io/docs/en/configuration#setupfiles-array

In `jest.config.json`, we have:
```
{
    "setupFiles": [
      "raf/polyfill",
      "<rootDir>/src/test/setupTests.js"
    ]
}
```
The polyfill must be loaded first.  The path for anything not in node modules, such as our enzyme setup file, 
needs <rootDir> so that the path is relative to the root of the project.

Lastly, we have to let jest know to use the `jest.config.json` so we specify that in package.json:

`"test": "jest --config=jest.config.json",`

The enzyme snapshots by default include a lot of internal metadata that we don't need.
To avoid that, we use enzyme-to-json.  It then works just like when using ReactShallowRenderer.
See Header.test.js
```
import toJSON from 'enzyme-to-json'
it('The snapshot should match', () => {
    const wrapper = shallow(<Header />);
    expect(toJSON(wrapper)).toMatchSnapshot();
})
```

We always want this JSON serialization to happen so we add this to the jest config too i.e.
```
{
    "setupFiles": [
      "raf/polyfill",
      "<rootDir>/src/test/setupTests.js"
    ],
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
}
```
 We then don't need to import toJSON from 'enzyme-to-json' and we can just do:
 `expect(wrapper).toMatchSnapshot();`

We need to test components 'unconnected' i.e. with test data that we pass in, not data from the store.  
The connected component is generally the default export, so we need to export the basic unconnected component too.  
Remember, we can export as many named components as we want, even if we're exporting a default component.  See ExpenseList.test.js 

