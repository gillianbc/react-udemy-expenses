// if a startDate filter is Nan, then valid match on date is set as true
// if the expense createdAt is on or after the startDate filter, it's a match
// The filtered expenses are an array so we can chain to Array.prototype.sort
export const getVisibleExpenses = (expenses, { startDate, endDate, text, sortBy}) => {
    console.log('Calculating visible', startDate, endDate, text, sortBy)
    console.log(text.toLowerCase())
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase())
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }
        if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
}

export const getAllExpenses = (expenses, { sortBy }) => {
    return expenses.sort((a, b) => {
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }
        if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
}