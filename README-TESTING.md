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

:scream: EXCEPT... that didn't work, I am getting object object so the serialization is not happening in my snapshots.  Raised issue in the Q&A
Sec12-Lec120 - resolved by copying in all the tutor's config files and yarn installing.  This puts me back on react 15 and babel 6, but it works OK.

In Sec12-Lec121, I had more issues as I was using Uk dates in ExpenseForm.js i.e. 
`moment.locale('en_GB');`
I have commented this out for now.  Also note that by reverting the versions to match the tutors, I could no longer get the app to start as it's on very
old versions that are incompatible with my Windows version.  I will get through the testing chapters, then revert back to my more recent versions to finish the
sass chapters.

:warning: Also note that in intellij, right-clicking a test file and running it is not the same as doing `npm test`.  Our test script is:
`"test": "jest --config=jest.config.json"` so that is what you need to use when right-click testing.  
i.e. in the run configuration, use jest options `--config=jest.config.json`

We need to test components 'unconnected' i.e. with test data that we pass in, not data from the store.  
The connected component is generally the default export, so we need to export the basic unconnected component too.  
Remember, we can export as many named components as we want, even if we're exporting a default component.  See ExpenseList.test.js.
If the component is not connected, then the usual export is just fine for testing. 

# Spies
See notes in ExpenseForm.test.js for details of: 
- how to test an event e.g. submit
- how to use a spy to override a props callback function
- how to call a 3rd party component's callback function (SingleDatePicker.onDateChange) directly 

In AddExpensePage.test.js, we need to set up spies for two functions:
- addExpense()
- history.push()

Note how the latter is a function within the history object.

Typically, we use the same name for spies:
```
const addExpense = jest.fn();
const history = { push: jest.fn() };
```

## Testing a function of a component
e.g. the AddExpensePage has an onSubmit() function.  The onSubmit() is a callback that it passes down to the ExpenseForm
component as a prop.  
1) we need spies for any functions that it calls  
2) we call the function and pass in the necessary args

```js
wrapper.find('ExpenseForm').prop('onsubmit')(expense)
```
# Mocking with Jest
When we want to create a snapshot of the Expense Form, we can pass in no expense and that will cause the default values to come into play,
as if we were creating a new expense.  However, the createdAt field defaults to the current moment in time, so when the test re-runs,
the snapshot doesn't match as the timestamp will be different.

Mocks for jest need to be in the `__mocks__` folder under the tests folder.  Use the name of the module you're mocking e.g. moment.js.

To get around that, we need to mock out moment so that if moment is called on to give us the current date/time, it returns a fixed value.
If a createdAt value is passed in, we still want to call the real moment, but we cannot just do an import of moment as that would call our mock moment.

Jest docs for this:  https://jestjs.io/docs/en/manual-mocks

## Refactoring Steps for App Modules Before Testing
- Use class based component
- Move inline functions withing the JSX to class functions and just reference them in the JSX
- For each dispatch call, define a function property xxx of mapDispatchToProps and pass that in using connect
- use the passed in this.props.xxx rather than using dispatch directly within the class

# IntelliJ Jest - Run individual test via Right-Click
Configuration file:  C:\DEV\gillian\react-udemy-expenses\jest.config.json
Jest Package: C:\DEV\gillian\react-udemy-expenses\node_modules\jest
Working directory: C:\DEV\gillian\react-udemy-expenses
Jest options:  (nothing - can do `--watch` if you like)

Use the above to set up a Jest template and then you'll be able to run individual tests or individual test files.

:heart: IntelliJ also shows a little camera icon next to each test that has a snapshot - this is REALLY useful for checking
what's been rendered.  If you have to laboriously page through to find things, you will not check properly. 
