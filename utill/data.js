 export function getFormattedDate(date)  {
   return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
 }
 export function getDateMinusDate(date,Days) {
  return new Date(date.getFullYear(),date.getMonth(),date.getDate()-Days)
 }