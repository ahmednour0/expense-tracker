import axios from "axios";
const BACKEND_URL =
  "https://react-native-course-c307b-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData) {
  console.log(expenseData);
  try {
    const res = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
    const id =res.data.name;
    return id
  } catch (error) {
    console.error("Failed to store expense:", error);
  }
}

export async function fetchExpenses() {
  const res = await axios.get(
    BACKEND_URL + "/expenses.json"
  );

  const expenses = [];
  console.log(expenses);
  for (const key in res.data) {
    const expenseobj = {
      id: key,
      amount: res.data[key].amount,
      date: new Date(res.data[key].date),
      description: res.data[key].description,
    };
    expenses.push(expenseobj);
  }

  return expenses;
}


export function updateExpense(id,ExpenseData) {
  return  axios.put(BACKEND_URL + `/expenses/${id}.json`,ExpenseData)
}
export function deleteExpensee(id) {
    return  axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}
