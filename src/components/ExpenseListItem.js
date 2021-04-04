import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import currencyAmount from "../utilities/currency";


const ExpenseListItem = ({ id, amount, description, createdAt }) => {
  console.log("EXPENSE LIST ITEM", description);
  return (
    <div>
      <p>
        <Link to={"edit/" + id}>{description }</Link>
          {currencyAmount(amount)}
          Created Date: {moment(createdAt).format('Do MMMM YYYY')}.
      </p>
    </div>
  );
};

export default ExpenseListItem;
