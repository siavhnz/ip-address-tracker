import ipRegex from "ip-regex";

export const apiUrl = (type, value) => {
  let address = `https://geo.ipify.org/api/v2/country,city?apiKey=${
    import.meta.env.VITE_APP_IPIFY_API_KEY
  }`;

  if (type === "ip") {
    address = `https://geo.ipify.org/api/v2/country,city?apiKey=${
      import.meta.env.VITE_APP_IPIFY_API_KEY
    }&ipAddress=${value}`;
  }

  if (type === "domain") {
    address = `https://geo.ipify.org/api/v2/country,city?apiKey=${
      import.meta.env.VITE_APP_IPIFY_API_KEY
    }&domain=${value}`;
  }

  return address;
};

//https://www.geeksforgeeks.org/how-to-validate-a-domain-name-using-regular-expression/
function isValidDomain(str) {
  // Regex to check valid
  // Domain Name
  let regex = new RegExp(
    /^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/
  );

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) === true) {
    return true;
  } else {
    return false;
  }
}

export const validateUserInput = (str) => {
  let result = "";

  if (!str) {
    result = "error";
  }

  if (str && ipRegex({ exact: true }).test(str)) {
    result = "ip";
  } else if (str && isValidDomain(str)) {
    result = "domain";
  } else {
    result = "error";
  }

  return result;
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
  if (hourOffset > 0) {
    offset += minuteOffset * 60 * 1000;
  } else {
    offset += -(minuteOffset * 60 * 1000);
  }

  // create new Date object for a different timezone using supplied its GMT offset.

  let requestedTime = new Date(utcTime + offset);

  return `${requestedTime.getHours()} : ${requestedTime.getMinutes()}`;
};
