import moment from 'moment'

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 196,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    note: 'I never pay interest as I clear the whole balance every month',
    amount: 4500,
    createdAt: moment(0).add(40, 'days').valueOf()
}];