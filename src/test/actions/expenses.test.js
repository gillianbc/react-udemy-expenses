import { addExpense } from '../../actions/expenses'

it('should produce an add object with defaults', () => {
    const result = addExpense()
    console.log(result)
    expect(result).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    })
})

it('should produce an add object with given values', () => {
    const expense = {
        description: 'banana',
        note: 'note',
        amount: 1891,
        createdAt: 172617
    }
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
