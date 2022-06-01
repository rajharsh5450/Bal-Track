import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";

import Form from "./Form/Form";
import List from "./List/List";
import useStyles from "./styles";
import { ExpenseTrackerContext } from "../../context/context";
import InfoCard from "./InfoCard";

const MainCard = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={"Balance Tracker"}
        subheader={
          <Typography className={classes.subcolor}>
            Powered by Speechly
          </Typography>
        }
        style={{ color: "cyan" }}
      />
      <CardContent>
        <Typography align={"center"} variant="h5">
          Total Balance
        </Typography>

        <Typography align={"center"} variant="h5">
          {balance >= 0 ? `$${balance}` : `-$${balance * -1}`}
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ marginTop: "20px", lineHeight: "1.5em" }}
        >
          <InfoCard />
        </Typography>

        <Divider className={classes.divider} />

        <Form />
      </CardContent>

      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MainCard;
