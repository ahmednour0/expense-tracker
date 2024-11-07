import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ExpenseItem from './ExpenseItem';
const RenderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item}/>
}

const ExpensesList = ({expenses}) => {
    return (
        <FlatList data={expenses} renderItem={RenderExpenseItem} 
        keyExtractor={(item)=> item.id}/>
    );
}

const styles = StyleSheet.create({})

export default ExpensesList;
