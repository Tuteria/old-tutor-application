export const priceCalculator = ({
  studentNo = 1,
  price,
  hrs = 2,
  days = 3,
  wks = 4,
  discount = 0,
  nt = 1,
  tutor_cut = 1
}) => {
  const tP = price * hrs * days * wks;
  const totalPrice = nt * tP + tP * discount * (studentNo / nt - 1);
  let total = Math.ceil((totalPrice * tutor_cut) / 100) * 100;
  return total;
};

export const getPrice = ({
  state_factor = 1,
  region_factor = 1,
  plan_factor = 1.5,
  base_rate = 1200
}) => {
  return base_rate * plan_factor * state_factor * region_factor;
};

export function generateWeekDays(
  startDate,
  weekDay,
  occurence = 1,
  endDate = null,
  asDate = false
) {
  let result = [];
  var someDate = new Date(startDate.getTime());
  var numberOfDaysToAdd = 1;

  while (Boolean(endDate) ? someDate < endDate : result.length < occurence) {
    if (someDate >= startDate && someDate.getDay() === weekDay) {
      let res = new Date(someDate.getTime());
      if (!asDate) {
        res = res.toISOString().split("T")[0];
      }

      result.push(res);
    }
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  }
  return result;
}
export function formatDate(date) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  // if (Boolean(date.getDay())) {
  let week = daysOfWeek[date.getDay()].substring(0, 3);
  let month = months[date.getMonth()].substring(0, 3);
  return `${week}, ${month} ${date.getDate()}, ${date.getFullYear()}`;
  // }
}
export function generateBookingDays(
  noOfWeeks = 1,
  daysInWeek = ["Monday"],
  startDate = new Date(2017, 0, 10),
  asDate = false,
  noEnd = false
) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let endDate = noEnd
    ? noOfWeeks > 3
      ? addDays(new Date(startDate), noOfWeeks / 4)
      : null
    : false;
  let transposed_result = [];
  let newStartDate = !!startDate ? new Date(startDate) : new Date();
  let result = daysInWeek.map(day =>
    generateWeekDays(
      newStartDate,
      daysOfWeek.indexOf(day),
      noOfWeeks,
      endDate,
      asDate
    )
  );
  if (typeof result[0] !== "undefined") {
    transposed_result = [].concat(...result);
    // transposed_result = result[0].map((col, i) => result.map(row => row[i]));
  }
  return transposed_result;
}
export function getLessonDetails(noOfWeeks, daysInWeek, startDate) {
  let days = [].concat(
    ...generateBookingDays(noOfWeeks, daysInWeek, startDate, true)
  );
  // .map(x => new Date(x));
  let maxDate = new Date(Math.max.apply(null, days));
  let minDate = new Date(Math.min.apply(null, days));
  return {
    end_date: maxDate,
    lessonCount: days.length,
    start_date: minDate
  };
}

function getDaysInMonth(month, noOfMonths) {
  let months = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31
  };
  let counter = 0;
  let result = 0;
  let monthIncrement = month;
  while (counter < noOfMonths) {
    result += months[monthIncrement];
    if (monthIncrement === 11) {
      monthIncrement = -1;
    }
    monthIncrement += 1;
    counter += 1;
  }
  return result;
  // return (
  //   Object.keys(months)
  //     .slice(month, month + noOfMonths + 1)
  //     .map(x => months[x])
  //     .reduce((a, i) => a + i, 0) - months[month]
  // );
}

function addDays(firstDay, noOfMonths) {
  var date = new Date(firstDay);
  let days = getDaysInMonth(date.getMonth(), noOfMonths);
  date.setDate(date.getDate() + days);
  return date;
}
