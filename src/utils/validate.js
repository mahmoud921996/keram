// import { helpers } from "vuelidate/lib/validators";

export const isPhone = (val) => {
  if (val.test("/[0-9]{9,14}/")) {
    return true;
  }
  return;
};

export function isValidImgType(file) {
  return /\.(jpe?g|png|jpeg|jpg)$/i.test(file.name);
}
export function isValidPdfFile(file) {
  return /^[a-z0-9_()\-[\]]+\.pdf$/i.test(file.name);
}
export function isValidVideoType(file) {
  return /\.(avi|flv|mov|3gp|mkv|rmvb|wepm|wmv|mp4)$/i.test(file.name);
  // return /\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4)$/i.test(file.name);
}
export function isValidAudioType(file) {
  return /\.(?:wav|mp3)$/i.test(file.name);
}
export function isValidFilesType(file) {
  return /\.(doc|DOC|pdf|PDF)$/i.test(file.name);
}
export function isValidImgSize(fileSize, maxSize) {
  let sizeInKB = fileSize / 1024 / 1024;
  if (sizeInKB <= maxSize) {
    return true;
  } else {
    return false;
  }
}

export const minWords = (value) => (text) =>
  text ? text.split(" ").length >= value : true;

// export const maxWords = value => text =>
//   text ? text.split(" ").length <= value : true;

// export const maxWords = (param) =>
//   helpers.withParams({ type: "maxWords", maxWords: param }, (value) =>
//     value ? value.split(" ").length <= param : true
//   );
// biggerThan
// export const biggerThan = (param, fieldName) =>
//   helpers.withParams({ type: "biggerThan", biggerThan: fieldName }, (value) =>
//     value && param ? Number(value) > Number(param) : true
//   );
// export const smallerThan = (param, fieldName) =>
//   helpers.withParams({ type: "smallerThan", smallerThan: fieldName }, (value) =>
//     value && param ? Number(value) < Number(param) : true
//   );

// export const beforeDate = (param, fieldName) =>
//   helpers.withParams({ type: "beforeDate", beforeDate: fieldName }, (value) => {
//     return value && param ? value < param : true;
//   });
// export const afterDate = (param, fieldName) =>
//   helpers.withParams({ type: "afterDate", afterDate: fieldName }, (value) => {
//     return value && param ? value > param : true;
//   });

export const isRequired = (value) => {
  if (value !== "") {
    return true;
  } else {
    return false;
  }
};
export function isValidPDfType(file) {
  return /\.(pdf|PDF)$/.test(file.name);
}
export const validPhoneNumber = (value) => {
  if (
    value &&
    value.match(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)
  ) {
    return true;
  } else {
    return false;
  }
};

export const validLocationInSaudia = (value) => {
  if (value && value.includes("Saudi Arabia")) {
    return true;
  } else {
    return false;
  }
};

// export const hasNumbers = (param) => value => {
//   return param
//   // if (param) {
//   //   return /\d/.test(value) ? false : true;
//   // } else {
//   //   return false
//   // }

// };
// export const startWithSa = (value) => {
//   console.log(value);
//   if (value && value.match(/^(SA)$/)) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export const startWithSA = (param) =>
//   helpers.withParams({ type: "startWithSA" }, () => {
//     const value = param && param.map((el) => el.value).join("");
//     if (value && value.match(/^SA/)) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// export const validLength = (propertyValue, length) =>
//   helpers.withParams({ type: "validLength", length }, () => {
//     const value = propertyValue && propertyValue.map((el) => el.value).join("");
//     if (value.length < length) {
//       return false;
//     } else {
//       return true;
//     }
//   });

// export const hasNumbers = (param) =>
//   helpers.withParams({ type: "hasNumbers", param }, (value) => {
//     if (!param) {
//       return true;
//     }
//     return /\d/.test(value) ? true : false;
//   });

// export const hasCapitalLetters = (param) =>
//   helpers.withParams({ type: "hasCapitalLetters", param }, (value) => {
//     if (!param) {
//       return true;
//     }
//     return /[A-Z]/.test(value) ? true : false;
//   });

// export const hasLowerLetters = (param) =>
//   helpers.withParams({ type: "hasLowerLetters", param }, (value) => {
//     if (!param) {
//       return true;
//     }
//     return /[a-z]/.test(value) ? true : false;
//   });

// export const hasSpecialCharacters = (param) =>
//   helpers.withParams({ type: "hasSpecialCharacters", param }, (value) => {
//     if (!param) {
//       return true;
//     }
//     return /[@#$%^&+=]/.test(value) ? true : false;
//   });
