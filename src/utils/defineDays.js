export default () => {
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const currentDateString = currentDate.toISOString().substring(0, 10);

  const getDateXDaysAgo = (days) => {
    const dateDaysAgo = new Date(currentDate);
    dateDaysAgo.setDate(dayOfMonth - days);
    return dateDaysAgo.toISOString().substring(0, 10);
  };

  const dateMonthAgo = getDateXDaysAgo(30);
  const dateWeekAgo = getDateXDaysAgo(7);
  const dataNextMonth = getDateXDaysAgo(-30);
  return {
    currentDateString, dateMonthAgo, dateWeekAgo, dataNextMonth,
  };
};
