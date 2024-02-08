import messages from "../../../locale/messages";
import valid from "card-validator";

const validate = (values) => {
  const errors = {};

  if (!values.licenseNumber) {
    errors.licenseNumber = messages.required;
  } else if (values.licenseNumber && values.licenseNumber.toString().trim() == "") {
    errors.licenseNumber = messages.invalid;
  }

  if (!values.firstName) {
    errors.firstName = messages.required;
  } else if (values.firstName && values.firstName.toString().trim() == "") {
    errors.firstName = messages.invalid;
  }

  if (!values.lastName) {
    errors.lastName = messages.required;
  } else if (values.lastName && values.lastName.toString().trim() == "") {
    errors.lastName = messages.invalid;
  }

  if (!values.day) {
    errors.day = messages.required;
  }

  if (!values.year) {
    errors.year = messages.required;
  }

  let monthValidationLabel = parseInt(values.month);
  if (isNaN(monthValidationLabel)) {
    errors.month = messages.required;
  }

  if (!values.country) {
    errors.country = messages.required;
  }

  if (!values.message) {
    errors.message = messages.required;
  } else if (values.message && values.message.toString().trim() == "") {
    errors.message = messages.required;
  }

  // if (values.paymentType == 1 && !values.paymentCurrency) {
  //   errors.paymentCurrency = messages.required;
  // }

  // if (values.paymentType == 2) {
  //   if (!values.name) {
  //     errors.name = messages.required;
  //   } else if (values.name && values.name.toString().trim() == "") {
  //     errors.name = messages.required;
  //   }

  //   if (!values.cardNumber) {
  //     errors.cardNumber = messages.required;
  //   } else {
  //     var numberValidation = valid.number(values.cardNumber);
  //     if (!numberValidation.isValid) {
  //       errors.cardNumber = messages.invalid;
  //     }
  //   }

  //   if (!values.expiryDate) {
  //     errors.expiryDate = messages.required;
  //   } else {
  //     var monthValidation = valid.expirationMonth(values.expiryDate);
  //     if (!monthValidation.isValid) {
  //       errors.expiryDate = messages.invalid;
  //     }
  //   }

  //   if (!values.expiryYear) {
  //     errors.expiryYear = messages.required;
  //   } else {
  //     var yearValidation = valid.expirationYear(values.expiryYear);
  //     if (!yearValidation.isValid) {
  //       errors.expiryYear = messages.invalid;
  //     }
  //   }

  //   if (!values.cvv) {
  //     errors.cvv = messages.required;
  //   } else {
  //     var maximumLength = 3;
  //     var numberValidation = valid.number(values.cardNumber);
  //     if (values.cardNumber && numberValidation.isValid) {
  //       var cardType = valid.number(values.cardNumber);
  //       if (cardType.card.type === "american-express") {
  //         maximumLength = 4;
  //       }
  //     }
  //     var cvvValidation = valid.cvv(values.cvv, maximumLength);
  //     if (!cvvValidation.isValid) {
  //       errors.cvv = messages.invalid;
  //     }
  //   }
  // }

  if (!values.paymentMethod) {
    errors.paymentMethod = messages.required;
  }

  if (values.paymentMethod === "creditCard") {
    if (!values.creditCardNumber || values.creditCardNumber.length !== 19) {
      errors.creditCardNumber = messages.required;
      errors.paymentMethod = messages.required;
    }

    if (!values.selectedCountry) {
      errors.selectedCountry = messages.required;
      errors.paymentMethod = messages.required;
    }

    if (!values.creditCardMonth) {
      errors.creditCardMonth = messages.required;
      errors.paymentMethod = messages.required;
    }

    if (!values.creditCardYear) {
      errors.creditCardYear = messages.required;
      errors.paymentMethod = messages.required;
    }

    if (!values.creditCardCvv || values.creditCardCvv.length !== 3) {
      errors.creditCardCvv = messages.required;
      errors.paymentMethod = messages.required;
    }
  }

  return errors;
};

export default validate;
