// @flow
//@ts-check
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import includes from "lodash/includes";
const fieldTypes = {
  EmailField: "email",
  PhoneNumberField: "phone_number"
};
const greaterThan = (value, min) => {
  return value.length >= min;
};
const validateInstance = (validation, value, min, max) => {
  switch (validation) {
    case "required":
      return !isEmpty(value.toString());
    case "email":
      return isEmail(value.toString());
    case "phone_number":
      return isMobilePhone(value.toString(), "any");
    case "minLength":
      return greaterThan(value, min);
    case "maxLength":
      return value.length > 0 && value.length <= max + 1;
    default:
      return true;
  }
};
function validateDate({ day, month, year }) {
  const errors = x => `A ${x} is required.`;
  const single = [{ day }, { month }, { year }]
    .filter(x => !!Object.values(x)[0] === false)
    .map(x => Object.keys(x)[0]);
  // if (single.length === 1) {
  //   return {
  //     isValid: false,
  //     errors: [errors(single[0])]
  //   };
  // }
  if (single.length > 0) {
    return {
      isValid: false,
      errors: single.map(x => ({ [x]: errors(x) }))
    };
  }
  return {
    isValid: true,
    errors: []
  };
}
export const getValueforField = field => {};
export function getErrorMessages(field: string, value, fieldItem) {
  let keys = Object.keys(fieldItem.error_messages);
  if (Object.keys(fieldTypes).indexOf(fieldItem.type) > -1) {
    keys.push(fieldTypes[fieldItem.type]);
  }
  if (includes(fieldItem.type, "ChoiceField")) {
    let index = keys.indexOf("invalid_choice");
    if (index > -1) {
      keys.splice(index, 1);
    }
  }
  if (fieldItem.type === "PhoneNumberField") {
    let index = keys.indexOf("invalid");
    keys.splice(index, 1);
  }
  if (fieldItem.type === "DateField") {
    return validateDate(value);
  }
  const additionalErrorMessages = {
    ...fieldItem.error_messages,
    email: "This email is invalid.",
    phone_number: fieldItem.error_messages["invalid"]
      ? fieldItem.error_messages["invalid"]
      : "This phone number is invalid."
  };
  let appliedValidations = keys.map((keyValue, index) => {
    let kwargs = fieldItem.kwargs || {};
    return {
      result: validateInstance(
        keyValue,
        value,
        kwargs.minLength,
        kwargs.maxLength
      ),
      field: keyValue
    };
  });
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

export const getPhoneFormErrorMessages = arr => {
  let primary = arr.filter(x => x.primary);
  if (primary.length > 1) {
    return {
      isValid: false,
      errors: ["Only one number can be set as primary at any given time."]
    };
  }
  return {
    isValid: true,
    errors: []
  };
};

export function allErrorMessages(state, DATA, allErrors = false) {
  let result = {};
  let keys = Object.keys(state);
  const basic = [
    "first_name",
    "last_name",
    "email",
    "country",
    "gender",
    "dob"
  ];
  if (allErrors) {
    keys = [...basic];
    keys.push("phone_numbers");
  }
  const results = keys.map(key => {
    let value = state[key] || "";
    if (key === "phone_numbers" && !!value === false) {
      value = [];
    }
    if (key === "dob" && !!value === false) {
      value = {};
    }
    if (basic.indexOf(key) > -1) {
      return {
        key,
        value: getErrorMessages(key, value, DATA.basic_profile_form[key])
      };
    } else {
      let vals = value.map(x => ({
        primary: x.primary,
        result: getErrorMessages(
          "number",
          x.number,
          DATA.phone_forms.form.number
        )
      }));
      // .filter(x=>!x.isValid)
      if (vals.length === 0) {
        vals = [
          {
            result: getErrorMessages(
              "number",
              "",
              DATA.phone_forms.form.number
            ),
            primary: true
          }
        ];
      }
      let err = {};
      let primary = vals.find(x => x.primary);
      let second = vals.find(x => !x.primary);
      if (primary) {
        err["primary_number"] = primary.result.errors || [];
      }
      if (second) {
        err["secondary_number"] = second.result.errors || [];
      }
      return {
        key,
        value: {
          errors: err,
          isValid: vals.filter(x => !x.result.isValid).length === 0
        }
      };
    }
  });
  const withErrors = results.filter(x => !x.value.isValid);
  withErrors.forEach(x => {
    result[x.key] = x.value.errors;
  });
  return result;
}

const determineCustomError = (errors, customError = "", noOfErrors) => {
  if (noOfErrors === 1) {
    return errors.find(i => i.errors.length > 0).errors[0];
  }
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
  return `Both ${heading} ${customError}`;
};

export function customErrorMessages(
  customError = "are required",
  newState,
  func = determineCustomError
) {
  const errors = Object.keys(newState).map(x => ({
    key: x,
    errors: newState[x]
  }));
  const noOfErrors = errors.reduce(
    (sum, i) => sum + (i.errors.length > 0 ? 1 : 0),
    0
  );
  if (noOfErrors === 0) {
    return "";
  }
  return func(errors, customError, noOfErrors);
}

export function cherryPickErrors(state, ...fields) {
  let result = {};
  fields.forEach((x, i) => {
    if (state[x]) {
      if (x === "dob") {
        let u = {};
        state[x].forEach(c => {
          u[Object.keys(c)[0]] = Object.values(c);
        });
        result = { ...result, ...u };
      } else if (x === "phone_numbers") {
        result = { ...result, ...state[x] };
      } else {
        result[x] = state[x];
      }
    }
  });
  return result;
}

/* Utility function to sync data from server to data from store */
export function insertLocalDataToStore(state, serverData) {
  let result = {};
  Object.keys(state).forEach(x => {
    result[x] = serverData[x];
    if (x === "dob") {
      let newDate = new Date(serverData[x]);
      result[x] = {
        day: newDate.getDate(),
        month: newDate.getMonth() + 1,
        year: newDate.getFullYear()
      };
    }
  });
  return result;
}
