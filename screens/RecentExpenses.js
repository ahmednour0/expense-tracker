import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDate } from '../utill/data';
import { fetchExpenses } from '../utill/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
    const [isFetching, setisFetching] = useState(true)
    const [error, seterror] = useState()
  const expensesCtx = useContext(ExpensesContext);
  console.log(expensesCtx)
  
    useEffect(() => {
        async function getExpenses () {
            setisFetching(true)
            try{
                const expenses = await fetchExpenses()
                expensesCtx.setExpenses(expenses)


            }catch(err){
                seterror("Could not get expenses")
            }
        setisFetching(false)

        }
        getExpenses()
    },[])
  
    
    if (error && !isFetching) {
        return <ErrorOverlay message={error} />
    }
    if (isFetching){
        return <LoadingOverlay/>
    }
    const recentExpenses = expensesCtx.expenses.filter((expenses)=>{
        const today = new Date()
        const date7DaysAgo = getDateMinusDate(today,7)
        return (expenses.date >=date7DaysAgo) && (expenses.date < today)
    })
    return (
       <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days"/> 
    );
}

const styles = StyleSheet.create({})

export default RecentExpenses;


