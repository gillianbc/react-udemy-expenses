export const getExpensesTotal = (expenses) => {
    console.log(expenses)
    if (expenses.length == 0) return 0;

    const reducer = (accumulator, currentValue, ) => (accumulator + currentValue);
    console.log(expenses.map(expense => expense.amount))
    return(
        expenses.map(expense => expense.amount)
        .reduce(reducer));
}
