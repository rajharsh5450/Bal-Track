import React from "react";

const InfoCard = () => {
  const isIncome = Math.round(Math.random());

  return (
    <div style={{ textAlign: "center", padding: "0 6%" }}>
      Try Saying : <br />
      Add {isIncome ? "Income " : "Expense "} of {isIncome ? "100 " : "50 "}{" "}
      dollars in category {isIncome ? "Business " : "Travel "} for{" "}
      {isIncome ? "Monday " : "Tuesday "}...
    </div>
  );
};

export default InfoCard;
