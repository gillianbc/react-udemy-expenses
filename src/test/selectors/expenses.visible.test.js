import {getVisibleExpenses} from "../../selectors/expenses";

const expenses = [
    { description: 'a', amount: 100, createdAt: 1000 },
    { description: 'a', amount: 200, createdAt: 2000 },
    { description: 'a', amount: 300, createdAt: 3000 },
]

it('test', () => {
    console.log(JSON.stringify(expenses))
    const result = getVisibleExpenses(expenses, { startDate: 2000, endDate: 10000, text: 'a', sortBy: 'amount'})
    console.log(JSON.stringify(result))
    expect(result).toEqual([
        { description: 'a', amount: 300, createdAt: 3000 },
        { description: 'a', amount: 200, createdAt: 2000 }
    ])
})