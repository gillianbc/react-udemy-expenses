import {getExpensesTotal} from "../../selectors/expensesTotal";

it('test multiple amounts', () => {
    const expenses = [
        { description: 'a', amount: 100, createdAt: 1000 },
        { description: 'a', amount: 200, createdAt: 2000 },
        { description: 'a', amount: 300, createdAt: 3000 },
    ]
    console.log(JSON.stringify(expenses))
    const result = getExpensesTotal(expenses)
    console.log(JSON.stringify(result))
    expect(result).toEqual(600)
})

it('test single amounts', () => {
    const expenses = [
        { description: 'a', amount: 100, createdAt: 1000 },
    ]
    console.log(JSON.stringify(expenses))
    const result = getExpensesTotal(expenses)
    console.log(JSON.stringify(result))
    expect(result).toEqual(100)
})

it('test empty', () => {
    const expenses = []
    console.log(JSON.stringify(expenses))
    const result = getExpensesTotal(expenses)
    console.log(JSON.stringify(result))
    expect(result).toEqual(0)
})