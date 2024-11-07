import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./input";
import Button from "../UI/Button";
import { getFormattedDate } from "./../../utill/data";

const ExpenseForm = ({
  SubmitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues?.date ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description || "",
      isValid: true,
    },
  });

  function InputChange(inputIdentifier, enteredValue) {
    setInputs((current) => {
      return { ...current, [inputIdentifier]: { value: enteredValue, isValid: true } };
    });
  }

  function submithandler() {
    const expenseData = {
      amount: parseFloat(inputs.amount.value), // Parsing to float for decimal support
      date: new Date(inputs.date.value), // Correctly parse date string
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((curr) => {
        return {
          amount: { value: curr.amount.value, isValid: amountIsValid },
          date: { value: curr.date.value, isValid: dateIsValid },
          description: { value: curr.description.value, isValid: descriptionIsValid },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: InputChange.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            keyboardType: "default",
            onChangeText: InputChange.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: InputChange.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={{ color: "red", textAlign: "center" }}>Invalid input values - Please check your data!</Text>
      )}
      <View style={styles.Buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submithandler}>
          {SubmitButtonLabel === "Update" ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  Buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
});

export default ExpenseForm;
