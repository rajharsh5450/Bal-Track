import React from "react";
import { Grid } from "@material-ui/core";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from "@speechly/react-ui";

import Details from "./components/Details/Details";
import MainCard from "./components/MainCard/MainCard";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        justifyContent={"center"}
        spacing={0}
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details cardTitle={"Income"} />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.main}>
          <MainCard />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details cardTitle={"Income"} />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details cardTitle={"Expense"} />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
