import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
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
const ExpenseListItem = ({ id, amount, description, createdAt }) => {
  console.log("EXPENSE LIST ITEM", description);
  return (
    <div>
      <p>
        <Link to={"edit/" + id}>{description }</Link>
          {numeral(amount/100).format('$0.00')}
          Created Date: {moment(createdAt).format('Do MMMM YYYY')}.
      </p>
    </div>
  );
};

export default ExpenseListItem;
