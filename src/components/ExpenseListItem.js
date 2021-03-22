import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, amount, description, createdAt }) => {
  console.log("EXPENSE LIST ITEM", description);
  return (
    <div>
      <p>
        <Link to={"edit/" + id}>{description}</Link> £{amount} Created Date:{" "}
        {createdAt}.
      </p>
    </div>
  );
};

export default ExpenseListItem;
