// @flow
import intersection from "lodash/intersection";
let options = {
  // address: ["street_number", "route"],
  state: ["locality", "administrative_area_level_1"],
  vicinity: ["administrative_area_level_2"],
  area: ["neighborhood"]
};
function getCategory(types_ARR) {
  return Object.keys(options).filter(x => {
    let v = intersection(options[x], types_ARR);
    return v.length > 0;
  });
}
export function sortAddress(location_array) {
  let result = { state: "", vicinity: "", area: "" };
  location_array.forEach((value, index) => {
    var r = getCategory(value.types);
    if (r.length > 0) {
      result[r[0]] = value["long_name"];
    }
  });
  if (result.state === "Federal Capital Territory") {
    result.state = "Abuja";
  }
  return result;
}

export function getAddressValue(location_array) {
  const first_two = location_array.slice(0, 2);
  let result = "";
  let transform = first_two.filter(
    x => intersection(x.types, ["route", "street_number"]).length > 0
  );
  const result2 = transform.reduce((x, a) => `${x} ${a.long_name}`, result);
  return result2.trim();
}

const validateInstance = (validation: string, value) => {
  switch (validation) {
    case "required":
      return !isEmpty(value);

    default:
      return false;
  }
};

const validateArea = ({ area = "", vicinity = "" }, error_messages) => {
  const conditions = {
    required: isEmpty,
    vicinity: value => vicinity.trim() === value.trim()
  };
  let err = Object.keys(error_messages).filter(x => conditions[x](area));
  if (err.length > 0) {
    return {
      isValid: false,
      errors: err.map(x => error_messages[x])
    };
  }
  return {
    isValid: true,
    errors: []
  };
};

export function getErrorMessages(field: string, value, fieldItem) {
  let keys = Object.keys(fieldItem.error_messages);
  if (field === "area") {
    return validateArea(value, fieldItem.error_messages);
  }
  const additionalErrorMessages = {
    ...fieldItem.error_messages
  };
  let appliedValidations = keys.map((keyValue, index) => ({
    result: validateInstance(keyValue, value),
    field: keyValue
  }));
  const isValid = appliedValidations.reduce(
    (sum, val) => sum && val.result,
    true
  );
  const errorMessages = appliedValidations
    .filter(x => x.result === false)
    .map((val, index) => {
      const result = additionalErrorMessages[val.field];
      return result;
    });
  return {
    isValid,
    errors: errorMessages
  };
}

export const determineCustomError = (errors, customError = "") => {
  const keys = errors.map(i => i.key);
  let heading = "";
  keys.forEach((o, i) => {
    if (i === keys.length - 1) {
      heading += ` and `;
    }
    heading += `${o}`;
    if (i < keys.length - 2) {
      heading += ", ";
    }
  });
  return `The ${heading} ${customError}`;
};

export const customErrorMessages = (customError, newState) => {
  return PCustomErrorMessages(customError, newState, determineCustomError);
};

export function allErrorMessages(state, DATA, allErrors = false) {
  let result = {};
  let keys = Object.keys(state);
  const basic = [
    "address",
    "state",
    "vicinity",
    "area",
    "latitude",
    "longitude"
  ];
  if (allErrors) {
    keys = [...basic];
  }
  const results = keys.map(key => {
    let value = state[key] || "";
    if (key === "area" && !!value === false) {
      value = {
        vicinity: state["vicinity"],
        area: state["area"]
      };
    }
    if (basic.indexOf(key) > -1) {
      return {
        key,
        value: getErrorMessages(key, value, DATA.address_form[key])
      };
    }
    return {
      key,
      value
    };
  });
  const withErrors = results.filter(x => !x.value.isValid);
  withErrors.forEach(x => {
    result[x.key] = x.value.errors;
  });
  return result;
}

export function insertLocalDataToStore(state, serverData) {
  let result = {};
  let location = serverData.location || {};
  Object.keys(state).forEach(x => {
    result[x] = !!location[x] ? location[x] : state[x];
  });
  return result;
}
