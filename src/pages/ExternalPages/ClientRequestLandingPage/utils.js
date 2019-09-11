export function UnixTimeConverter(unix_timestamp) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date() - unix_timestamp;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    if (Math.round(elapsed / msPerMonth - 1) <= 1) {
      return "1 month ago";
    } else {
      return Math.round(elapsed / msPerMonth - 1) + " months ago";
    }
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}

export function getTimeToGo(unix_timestamp) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = unix_timestamp - new Date();

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days";
  } else if (elapsed < msPerYear) {
    if (Math.round(elapsed / msPerMonth - 1) <= 1) {
      return "1 month ago";
    } else {
      return Math.round(elapsed / msPerMonth - 1) + " months";
    }
  } else {
    return Math.round(elapsed / msPerYear) + " years";
  }
}

export function getLocaleDateString(date) {
  const options = { month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
}

export function getDurationFromDates(startDate, endDate) {
  const options = { hour: "numeric", minute: "numeric" };
  let start = new Date(startDate).toLocaleTimeString("en-US", options);
  let end = new Date(endDate).toLocaleTimeString("en-US", options);
  return `${start} - ${end}`;
}
