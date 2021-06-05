import { addExpense, startAddExpense } from '../../actions/expenses'
import expenses from '../resources/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { db } from '../../firebase/firebase';

// Apply any middlewares we need to the mock store.  We just need one - thunk
const mockStore = configureMockStore([thunk]);

test('startaddexpense should add expense with defaults to database and store', (done) => {
    const store = mockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    const expected = {
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseDefaults
        }
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expected);
        // Get the expense with the give id from firebase
        return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((savedExpense) => {
        expect(savedExpense.val()).toEqual(expenseDefaults);
        done();
    });
});

it('basic addExpense action generator should produce an add object with given values', () => {
    const expense = expenses[2]
    const result = addExpense(expense)
    console.log(result)
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense,
            id: expect.any(String)
        }
    })
})

test('startAddExepense should add expense with expected values to database and store',
    (done) => {
    const store = mockStore({});
    const expenseData = {
        description: 'Hello dolly',
        amount: 101,
        note: 'I have a bit of backache',
        createdAt: 102
    };

    const expected = {
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expected);
        // Get the expense with the give id from firebase
        return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((savedExpense) => {
        expect(savedExpense.val()).toEqual(expenseData);
        done();
    });
});


