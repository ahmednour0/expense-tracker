import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/MangeExpense/ExpenseForm";
import { storeExpense, updateExpense,deleteExpensee} from "../utill/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const MangeExpense = ({ route, navigation }) => {
  const [isSubmit, setisSubmit] = useState(false)
  const [error, seterror] = useState()

  const expensesCtx = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseid;
  const isEditing = !!editExpenseId;
  const SelectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
   const deleteExpense = async() => {
    setisSubmit(true)
    try{
      await deleteExpensee(editExpenseId)
      expensesCtx.deleteExpense(editExpenseId);
      navigation.goBack();
    }catch(error){
      seterror("Could not delete expenses - please try again later!")

    }
   
   setisSubmit(false)

  
  };
  const CancelHandler = (params) => {
    navigation.goBack();
  };
   const ConfirmHandler = async(expenseData) => {
    setisSubmit(true)
try{
  if (isEditing) {

    expensesCtx.updateExpense(editExpenseId, expenseData);
  await  updateExpense(editExpenseId,expenseData)
  setisSubmit(false)

  } else {
    setisSubmit(true)

 const id =  await storeExpense(expenseData)

    expensesCtx.addExpense({...expenseData,id:id});
  }
  navigation.goBack();

}catch(error){
seterror('Could not save data - please try again later')
setisSubmit(false)
}
   
 
  };

  
  if (error && !isSubmit) {
    return <ErrorOverlay message={error} />
  }
  if (isSubmit){
    return <LoadingOverlay/>
}
  return (
    <View style={styles.container}>
      <ExpenseForm
        SubmitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={ConfirmHandler}
        onCancel={CancelHandler}
        defaultValues= {SelectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            onPress={deleteExpense}
            color={GlobalStyles.colors.error500}
            size={36}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary500,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default MangeExpense;
