import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Paper,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useSpeechContext } from "@speechly/react-client";

import CustomizedSnackbar from "../../SnackBar/Snackbar";
import { ExpenseTrackerContext } from "../../../context/context";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import useStyles from "./styles";
import formatDate from "../../../utils/formatDate";

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  date: formatDate(new Date()),
};

const Form = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();

  const createTransaction = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"))
      return;

    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };

    addTransaction(transaction);
    setOpen(true);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense")
        setFormData({ ...formData, type: "Expense" });
      else if (segment.intent.intent === "add_income")
        setFormData({ ...formData, type: "Income" });
      else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      )
        return createTransaction();
      else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      )
        return setFormData(initialState);

      segment.entities.forEach((e) => {
        switch (e.type) {
          case "amount":
            setFormData({ ...formData, amount: e.value });

            break;

          case "category":
            const category = `${e.value.charAt(0)}${e.value
              .slice(1)
              .toLowerCase()}`;

            if (incomeCategories.map((ic) => ic.type).includes(category))
              setFormData({ ...formData, category: category, type: "Income" });
            else if (expenseCategories.map((ic) => ic.type).includes(category))
              setFormData({ ...formData, category: category, type: "Expense" });

            break;

          case "date":
            setFormData({ ...formData, date: e.value });

            break;

          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.type &&
        formData.category &&
        formData.amount &&
        formData.date
      )
        createTransaction();
    }
  }, [segment]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Paper elevation={6} className={classes.paper}>
          <Typography variant={"subtitle2"} align="center" gutterBottom>
            {segment && segment.words.map((w) => w.value).join(" ")}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel style={{ color: "#cae5e8" }}> Type</InputLabel>
          <Select
            inputProps={{ className: classes.select }}
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel style={{ color: "#cae5e8" }}>Category</InputLabel>
          <Select
            inputProps={{ className: classes.select }}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField
          InputLabelProps={{ style: { color: "#cae5e8" } }}
          inputProps={{ className: classes.textfield }}
          type={"number"}
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          InputLabelProps={{ style: { color: "#cae5e8" } }}
          inputProps={{
            className: classes.textfield,
          }}
          type={"date"}
          label={"Date"}
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
        />
      </Grid>

      <Button
        className={classes.button}
        variant="contained"
        color={"primary"}
        fullWidth
        onClick={createTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
