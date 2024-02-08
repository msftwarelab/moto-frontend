import React, { useEffect, useRef, useState } from "react";

import { FormattedMessage, IntlProvider, injectIntl } from "react-intl";

import { change, Field } from "redux-form";

import { connect } from "react-redux";

import { compose, gql, graphql } from "react-apollo";

import messages from "../../../locale/messages";

import cx from "classnames";
import cs from "../../commonStyle.css";
import s from "./Payment.css";

import rightTopArrowIcon from "/public/SiteIcons/arrow-right-top.svg";
import chevronIcon from "/public/SiteIcons/chevron.svg";

import alipaySmall from "/public/SiteIcons/alipaySmall.svg";
import googlepaySmall from "/public/SiteIcons/googlepaySmall.svg";
import mobilebanking from "/public/SiteIcons/mobileBanking.png";
import promptpaySmall from "/public/SiteIcons/promptpaySmall.png";

import alipayLarge from "/public/SiteIcons/alipayLarge.svg";
import promptpayLarge from "/public/SiteIcons/promptpayLarge.png";

import bblbank from "/public/SiteIcons/bangkokBank.png";
import baybank from "/public/SiteIcons/kbank.png";
import krungsribank from "/public/SiteIcons/krungsriBank.png";
import krungthaibank from "/public/SiteIcons/krungthaiBank.png";
import scbbank from "/public/SiteIcons/scbBank.png";
import { GoogleButton } from "./GooglePayButton";

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth();
let MONTHS = {},
  YEARS = [CURRENT_YEAR];
for (let i = 1; i <= 12; i++) {
  MONTHS[i] = i.toString().length === 1 ? `0${i}` : i.toString();
  YEARS.push(YEARS[0] + i);
}

const paymentMethods = [
  {
    id: 2,
    label: "GooglePay",
    value: "googlepay",
    icon: googlepaySmall,
  },
  {
    id: 4,
    label: "PromptPay",
    value: "promptpay",
    icon: promptpaySmall,
  },
  {
    id: 3,
    label: "Alipay",
    value: "alipay",
    icon: alipaySmall,
  },
  {
    label: "Mobile Banking",
    value: "",
    icon: mobilebanking,
  },
];

const mobileBankingMethods = [
  {
    id: 5,
    label: "Mobile Banking Bay",
    value: "mobile_banking_bay",
    icon: baybank,
  },
  {
    id: 6,
    label: "Mobile Banking BBL",
    value: "mobile_banking_bbl",
    icon: bblbank,
  },
  {
    id: 7,
    label: "Mobile Banking KBank",
    value: "mobile_banking_kbank",
    icon: krungsribank,
  },
  {
    id: 8,
    label: "Mobile Banking KTB",
    value: "mobile_banking_ktb",
    icon: scbbank,
  },
  {
    id: 9,
    label: "Mobile Banking SCB",
    value: "mobile_banking_scb",
    icon: krungthaibank,
  },
];

const AutocompleteSelect = ({ options, placeholder, formatMessage, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState([]);

  console.log(options);

  const inputRef = useRef(null);

  // useEffect(() => {
  //   setFilteredOptions(
  //     options.filter((option) =>
  //       option.countryName.toLowerCase().includes(inputRef.value.toLowerCase())
  //     )
  //   );
  // }, [inputRef, options]);

  const handleInputChange = () => {
    setIsOpen(true);
    dispatch(change("PaymentForm", "selectedCountry", ""));

    setFilteredOptions(
      options.filter((option) =>
        option.countryName.toLowerCase().includes(inputRef.current.value.toLowerCase())
      )
    );
  };

  const handleSelectCountry = (country) => {
    inputRef.current.value = country.countryName;
    setSelectedCountry(country.countryName);
    setIsOpen(false);
    dispatch(change("PaymentForm", "selectedCountry", country.countryCode));
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current.blur(); // Blurs the input field on 'Escape' key press
    }
  };

  return (
    <>
      <div className={s.autoComplete}>
        <input
          type="text"
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
          placeholder={placeholder}
          ref={inputRef}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className={s.dropdown}>
            {filteredOptions.map((country) => (
              <li
                key={country.code}
                onClick={() => handleSelectCountry(country)}
                className={s.dropdownItem}
              >
                {country.countryName}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Field
        name="selectedCountry"
        component={({ input: { value }, meta: { error, touched } }) => {
          return (
            <>
              <input value={value} type="hidden" />
              {touched && error && <div className={cs.errorMessage}>{formatMessage(error)}</div>}
            </>
          );
        }}
      />
    </>
  );
};

const PaymentMethod = ({ label, value, icon, onClick, arrow = "next" }) => {
  const isNextType = arrow === "next";

  return (
    <>
      <div className={s.paymentMethod} onClick={onClick}>
        <div>
          <img style={{ width: 40, height: 40, marginRight: "10px" }} src={icon} />
          <span className={s.paymentMethodTitle}>{label}</span>
        </div>
        <img style={{ width: 24 }} src={isNextType ? chevronIcon : rightTopArrowIcon} />
      </div>
    </>
  );
};

const paymentIcons = [
  googlepaySmall,
  promptpayLarge,
  alipayLarge,
  baybank,
  bblbank,
  krungsribank,
  scbbank,
  krungthaibank,
];

const paymentTexts = [
  "GooglePay",
  "PromptPay",
  "Alipay",
  "Bay Bank",
  "BBL Bank",
  "Kbank",
  "KTB",
  "SCB",
];

const PaymentScreen = ({ icon, name }) => {
  return (
    <>
      <div>
        <div className={s.paymentScreenImage}>
          <img src={icon} />
        </div>
        <div className={s.paymentScreenText}>
          You will be sent to a {name} page to complete your payment.
        </div>
      </div>
    </>
  );
};

const OpnPaymentsCard = (props) => {
  const {
    data: { getCountries: countries },
    dispatch,
  } = props;

  console.log(props);

  const { formatMessage } = props.intl;

  const [state, setState] = useState({
    sliderLocation: "",
    cardNumber: "",
    cardName: "",
    cardMonth: 0,
    cardYear: 0,
    cardCvv: "",
    cardType: "visa",
    toggleMonth: true,
    toggleYear: true,
  });

  const [paymentType, setPaymentType] = useState("creditCard");
  const [paymentTypeId, setPaymentTypeId] = useState(1);

  // creditCard, additionalMethods, mobileBanking, paymentScreen
  const [view, setView] = useState("creditCard");
  const [activePaymentIndex, setActivePaymentIndex] = useState(0);

  const numberInput = useRef(null);
  const cvvInput = useRef(null);
  const yearInput = useRef(null);
  const monthInput = useRef(null);

  const handleSubmit = async (cardFormValues) => {
    try {
      const token = await createTokenPromise("card", cardFormValues);
      // Send the token to your server to create a charge
    } catch (error) {
      // Handle error on the UI
    }
  };

  const formatCardNumber = (value) => {
    if (!value) return "";

    let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const getCardType = (number) => {
    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";
    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return "amex";
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";
    re = new RegExp("^6011");
    if (number.match(re) != null) return "discover";
    return "visa";
  };

  const moveSlider = (event, position) => {
    position = ["year", "month"].includes(position) ? "expiration" : position;
    setState({ ...state, sliderLocation: position });
  };

  const handleChange = (value, type) => {
    if (type === "cardNumber") {
      value = value.replace(/ /gi, "");
      if (isNaN(value)) {
        return;
      } else {
        // const cardType = getCardType(value);
        // setState({ ...state, [type]: value, cardType });
        dispatch(change("PaymentForm", "creditCardNumber", formatCardNumber(value)));
      }
    } else if (type === "cardMonth") {
      value = Number(value);
      // setState((prevState) => ({
      //   ...prevState,
      //   [type]: value,
      //   toggleMonth: !prevState.toggleMonth,
      // }));
      dispatch(change("PaymentForm", "creditCardMonth", value));
    } else if (type === "cardYear") {
      value = Number(value);
      const { cardMonth } = state;
      if (value === CURRENT_YEAR && cardMonth <= CURRENT_MONTH) {
        // setState((prevState) => ({
        //   ...prevState,
        //   cardMonth: 0,
        //   cardYear: value,
        //   toggleYear: !prevState.toggleYear,
        //   toggleMonth: !prevState.toggleMonth,
        // }));
      } else {
        // setState((prevState) => ({
        //   ...monthInput,
        //   [type]: value,
        //   toggleYear: !prevState.toggleYear,
        // }));
        dispatch(change("PaymentForm", "creditCardYear", value));
      }
    } else if (type === "cardCvv") {
      value = value.replace(/ /gi, "");
      if (isNaN(value)) {
        return;
      } else {
        // setState({ ...state, [type]: value });
        dispatch(change("PaymentForm", "creditCardCvv", value));
      }
    }
  };

  useEffect(() => {
    dispatch(change("PaymentForm", "paymentMethod", paymentType));
  }, [paymentType]);

  useEffect(() => {
    dispatch(change("PaymentForm", "paymentMethodId", paymentTypeId));
  }, [paymentTypeId]);

  useEffect(() => {
    dispatch(change("PaymentForm", "creditCardMonth", 0));
    dispatch(change("PaymentForm", "creditCardYear", 0));
  }, []);

  return (
    <>
      <IntlProvider messages={messages}>
        <div className={s.opnPaymentsContainer}>
          {view === "creditCard" && (
            <>
              <span
                className={s.otherMethods}
                onClick={() => {
                  setView("additionalMethods");
                  setPaymentType(null);
                }}
              >
                Other methods
                <img src={chevronIcon} />
              </span>
              <div className={cx(s.field, s.lgInput, s.noMargin)}>
                <label>
                  <FormattedMessage {...messages.paymentCardNumber} />
                </label>
                <Field
                  name="creditCardNumber"
                  onChange={(event) => handleChange(event.target.value, "cardNumber")}
                  component={({ input: { value }, meta: { error, touched } }) => {
                    return (
                      <>
                        <input
                          value={value}
                          className="number-input"
                          type="text"
                          onChange={(event) => handleChange(event.target.value, "cardNumber")}
                          // onSelect={(event) => moveSlider(event, "number")}
                          ref={(node) => (numberInput.current = node)}
                          placeholder="4242 4242 4242 4242"
                          maxLength="19"
                        />
                        {touched && error && (
                          <div className={cs.errorMessage}>{formatMessage(error)}</div>
                        )}
                      </>
                    );
                  }}
                />
              </div>
              <div className={cx(s.field, s.lgInput)}>
                <label>
                  <FormattedMessage {...messages.country} />
                </label>
                <AutocompleteSelect
                  options={countries || []}
                  placeholder={"Select country"}
                  formatMessage={formatMessage}
                  dispatch={dispatch}
                />
              </div>
              <div className={cx(s.flex, s.spaceBetween)}>
                <div className={cx(s.field, s.medInput, s.flexRow)}>
                  <label>
                    <FormattedMessage {...messages.cardExpires} />
                  </label>
                  <div className={s.flex}>
                    <Field
                      name="creditCardMonth"
                      component={({ input: { value }, meta: { error, touched } }) => {
                        return (
                          <div>
                            <select
                              value={value}
                              className={s.monthInput}
                              id="cardMonth"
                              ref={(node) => (monthInput.current = node)}
                              onChange={(e) => handleChange(e.target.value, "cardMonth")}
                            >
                              <option value="0" disabled>
                                Month
                              </option>
                              {Object.keys(MONTHS).map((monthKey) => (
                                <option
                                  key={monthKey}
                                  value={monthKey}
                                  disabled={
                                    state.cardYear === CURRENT_YEAR &&
                                    Number(monthKey) <= CURRENT_MONTH
                                  }
                                >
                                  {MONTHS[monthKey]}
                                </option>
                              ))}
                            </select>
                            {touched && error && (
                              <div className={cs.errorMessage}>{formatMessage(error)}</div>
                            )}
                          </div>
                        );
                      }}
                    />

                    <Field
                      name="creditCardYear"
                      component={({ input: { value }, meta: { error, touched } }) => {
                        return (
                          <div>
                            <select
                              value={value}
                              className={s.yearInput}
                              id="cardYear"
                              ref={(node) => (yearInput.current = node)}
                              onChange={(e) => handleChange(e.target.value, "cardYear")}
                            >
                              {" "}
                              <option value="0" disabled>
                                Year
                              </option>
                              {YEARS.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                            {touched && error && (
                              <div className={cs.errorMessage}>{formatMessage(error)}</div>
                            )}
                          </div>
                        );
                      }}
                    />

                    {/* <select
                      className={s.yearInput}
                      id="cardYear"
                      ref={(node) => (yearInput.current = node)}
                      name="creditCardYear"
                    >
                      {" "}
                      <option value="0" disabled>
                        Year
                      </option>
                      {YEARS.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select> */}
                  </div>
                </div>
                <div className={cx(s.field, s.smInput)}>
                  <label>
                    <FormattedMessage {...messages.cvv} />
                  </label>
                  <Field
                    name="creditCardCvv"
                    value={state.cardCvv}
                    component={({ input: { value }, meta: { error, touched } }) => {
                      return (
                        <>
                          <input
                            value={value}
                            className="cvv-input"
                            id="cardCvv"
                            ref={(node) => (cvvInput.current = node)}
                            maxLength="3"
                            placeholder="___"
                            onChange={(event) => handleChange(event.target.value, "cardCvv")}
                          />
                          {touched && error && (
                            <span className={cs.errorMessage}>{formatMessage(error)}</span>
                          )}
                        </>
                      );
                    }}
                  />
                </div>
              </div>
            </>
          )}
          {view === "additionalMethods" && (
            <>
              <span
                className={s.backToCredit}
                onClick={() => {
                  setView("creditCard");
                  setPaymentType("creditCard");
                  setPaymentTypeId(1);
                }}
              >
                <img className={s.rotated} src={chevronIcon} />
                Credit Card
              </span>
              <div className={s.otherPaymentMethods}>
                {paymentMethods.map((method, idx) =>
                  method.value === "googlepay" ? (
                    <div style={{display: "none"}}>
                      {/* <GoogleButton>
                        <PaymentMethod
                          label={method.label}
                          value={method.value}
                          icon={method.icon}
                          onClick={() => {
                            if (method.label === "Mobile Banking") {
                              setView("mobileBanking");
                            } else {
                              setView("paymentScreen");
                            }
                            setActivePaymentIndex(idx);
                            setPaymentType(method.value);
                            setPaymentTypeId(method.id);
                          }}
                          key={idx}
                        />
                      </GoogleButton> */}
                    </div>
                  ) : (
                    <PaymentMethod
                      label={method.label}
                      value={method.value}
                      icon={method.icon}
                      onClick={() => {
                        if (method.label === "Mobile Banking") {
                          setView("mobileBanking");
                        } else {
                          setView("paymentScreen");
                        }
                        setActivePaymentIndex(idx);
                        setPaymentType(method.value);
                        setPaymentTypeId(method.id);
                      }}
                      key={idx}
                    />
                  )
                )}
              </div>
            </>
          )}
          {view === "mobileBanking" && (
            <>
              <span
                className={s.backToCredit}
                onClick={() => {
                  setView("additionalMethods");
                  setPaymentType(null);
                  setPaymentTypeId(null);
                }}
              >
                <img className={s.rotated} src={chevronIcon} />
                Back to others
              </span>
              <div className={s.otherPaymentMethods}>
                {mobileBankingMethods.map((method, idx) => (
                  <PaymentMethod
                    value={method.value}
                    label={method.label}
                    onClick={() => {
                      // this have different indexes from paymentMethods as they are from defferent arrays,
                      const offset = 3;
                      setView("paymentScreen");
                      setActivePaymentIndex(offset + idx);
                      setPaymentType(method.value);
                      setPaymentTypeId(method.id);
                    }}
                    icon={method.icon}
                    arrow={"redirect"}
                    key={idx}
                  />
                ))}
              </div>
            </>
          )}
          {view === "paymentScreen" && (
            <>
              <span
                className={s.backToCredit}
                onClick={() => {
                  setView("additionalMethods");
                  setPaymentType(null);
                  setPaymentTypeId(null);
                }}
              >
                <img className={s.rotated} src={chevronIcon} />
                Back to others
              </span>
              <div>
                <PaymentScreen
                  icon={paymentIcons[activePaymentIndex]}
                  name={paymentTexts[activePaymentIndex]}
                />
              </div>
            </>
          )}
        </div>
        <Field
          name="paymentMethod"
          component={({ input, meta: { error, touched } }) => {
            return (
              <>
                <input {...input} type="hidden" />
                {touched && error && <div className={cs.errorMessage}>{formatMessage(error)}</div>}
              </>
            );
          }}
        />
        <Field
          name="paymentMethodId"
          component={({ input, meta: { error, touched } }) => {
            return (
              <>
                <input {...input} type="hidden" />
              </>
            );
          }}
        />
      </IntlProvider>
    </>
  );
};

export default compose(
  injectIntl,
  connect(null, null),
  graphql(
    gql`
      query getCountries {
        getCountries {
          id
          countryCode
          countryName
          isEnable
          dialCode
        }
      }
    `,
    { options: { ssr: false } }
  )
)(OpnPaymentsCard);
