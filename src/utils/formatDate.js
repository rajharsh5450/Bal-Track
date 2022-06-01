const formatDate = (date) => {
  const curDate = new Date(date);
  let day = `${curDate.getDay()}`;
  let month = `${curDate.getMonth() + 1}`;
  const year = `${curDate.getFullYear()}`;

  if (day.length < 2) day = `0${day}`;
  if (month.length < 2) month = `0${month}`;

  return [year, month, day].join("-");
};

export default formatDate;
