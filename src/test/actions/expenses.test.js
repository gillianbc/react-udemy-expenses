import { addExpense } from '../../actions/expenses'
import expenses from '../resources/expenses'
it.skip('should produce an add object with defaults', () => {
    const result = startAddExpense()()
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
