export const apiUrl = (ip) => {
  return `https://geo.ipify.org/api/v2/country,city?apiKey=${
    import.meta.env.VITE_APP_IPIFY_API_KEY
  }&ipAddress=${ip}`;
};

// https://stackoverflow.com/a/46261084
export const getUTCTime = (timeOffset) => {
  // timeOffset -> +03:30 or -07:00
  const [hourOffset, minuteOffset] = timeOffset.split(":");
  // create Date object for current location

  let date = new Date();

  // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
  let utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  let offset = 3600000 * hourOffset;
  if(hourOffset > 0) {
    offset += minuteOffset * 60 * 1000
  } else {
    offset += -(minuteOffset * 60 * 1000)
  }

  // create new Date object for a different timezone using supplied its GMT offset.

  let requestedTime = new Date(
    utcTime + offset
  );

  return `${requestedTime.getHours()} : ${requestedTime.getMinutes()}`;
};
