import React, { useContext } from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from "@material-ui/core";

import { Delete, MoneyOff, AttachMoney } from "@material-ui/icons";

import useStyles from "./styles";
import { ExpenseTrackerContext } from "../../../context/context";

const List = () => {
  const classes = useStyles();
  const { transactions, removeTransaction } = useContext(ExpenseTrackerContext);

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((trans) => (
        <Slide direction={"down"} in mountOnEnter unmountOnExit key={trans.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={
                  trans.type === "Income"
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                {trans.type === "Income" ? <AttachMoney /> : <MoneyOff />}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={trans.category}
              secondary={`$${trans.amount} ${
                trans.type === "Income" ? "earned" : "spent"
              } on ${trans.date}`}
              secondaryTypographyProps={{
                style: {
                  color: trans.type === "Income" ? "greenyellow" : "red",
                },
              }}
              primaryTypographyProps={{ style: { color: "#cae5e8" } }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge={"end"}
                aria-label="delete"
                onClick={() => removeTransaction(trans.id)}
              >
                <Delete style={{ color: "red" }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;
