import numeral from "numeral"

// load a locale
numeral.register('locale', 'GBP', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'first' : 'last';
    },
    currency: {
        symbol: '£'
    }
});

// switch between locales
numeral.locale('GBP');

const currencyAmount = (amount) => numeral(amount/100).format('$0.00')

export default currencyAmount;