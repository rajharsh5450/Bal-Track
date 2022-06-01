import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import useStyles from "./styles";
import useTransactions from "../../useTransactions";

const Details = ({ cardTitle }) => {
  const classes = useStyles();
  const { finalCategories, total } = useTransactions(cardTitle);

  const chartData = {
    datasets: [
      {
        data: finalCategories.map((c) => c.amount),
        backgroundColor: finalCategories.map((c) => c.color),
      },
    ],
    labels: finalCategories.map((c) => c.type),
  };

  return (
    <Card className={cardTitle === "Income" ? classes.income : classes.expense}>
      <CardHeader title={cardTitle} style={{ color: "cyan" }} />
      <CardContent>
        <Typography
          variant={"h5"}
          style={{ color: cardTitle === "Income" ? "greenyellow" : "red" }}
        >
          ${total}
        </Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details;
