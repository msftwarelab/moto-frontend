import { gql } from "react-apollo";
import {
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_SUCCESS,
  BOOKING_PAYMENT_ERROR,
} from "../../constants";

import { sendPayment } from "../../core/payment/sendPayment";
// Helper
import { convert } from "../../helpers/currencyConvertion";

import moment from "moment";

// OpnPayments
import { processOpnPaymentsPayment } from "../../core/payment/opnPayments/processOpnPaymentsPayment";

import { startTimeData, endTimeData } from "../../helpers/formatting";

import { toastr } from "react-redux-toastr";

// args: {
//   listId: { type: new NonNull(IntType) },
// hostId: { type: IntType },
// guestId: { type: IntType },
//   checkIn: { type: new NonNull(StringType) },
//   checkOut: { type: new NonNull(StringType) },
//   guests: { type: new NonNull(IntType) },
//   message: { type: new NonNull(StringType) },
//   basePrice: { type: new NonNull(FloatType) },
//   delivery: { type: FloatType },
//   currency: { type: new NonNull(StringType) },
//   discount: { type: FloatType },
//   discountType: { type: StringType },
//   guestServiceFee: { type: FloatType },
//   hostServiceFee: { type: FloatType },
//   total: { type: new NonNull(FloatType) },
//   bookingType: { type: StringType },
//   paymentType: { type: IntType },
//   cardToken: { type: StringType },
//   averagePrice: { type: FloatType },
//   days: { type: IntType },
//   startTime: { type: FloatType },
//   endTime: { type: FloatType },
//   licenseNumber: { type: new NonNull(StringType) },
//   firstName: { type: new NonNull(StringType) },
//   middleName: { type: StringType },
//   lastName: { type: new NonNull(StringType) },
//   dateOfBirth: { type: new NonNull(StringType) },
//   countryCode: { type: StringType },
//   isDeliveryIncluded: { type: BooleanType },
//   paymentCurrency: { type: StringType },
//   paymentMethod: { type: StringType },
//   token: { type: StringType }
// },

export function makePayment(
  listId,
  title,
  hostId,
  guestId,
  checkIn,
  checkOut,
  guests,
  message,
  basePrice,
  delivery,
  currency,
  discount,
  discountType,
  guestServiceFee,
  hostServiceFee,
  total,
  bookingType,
  // paymentCurrency,
  guestEmail,
  specialPricing,
  isSpecialPriceAssigned,
  isSpecialPriceAverage,
  dayDifference,
  startTime,
  endTime,
  licenseNumber,
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  countryCode,
  securityDeposit,
  paymentMethod,
  paymentType,
  token
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: BOOKING_PAYMENT_START,
      payload: {
        paymentLoading: true,
      },
    });

    // try {
    const mutation = gql`
      mutation createReservation(
        $listId: Int!
        $hostId: String!
        $guestId: String!
        $checkIn: String!
        $checkOut: String!
        $guests: Int!
        $message: String!
        $basePrice: Float!
        $delivery: Float
        $currency: String!
        $discount: Float
        $discountType: String
        $guestServiceFee: Float
        $hostServiceFee: Float
        $total: Float!
        $bookingType: String
        $paymentType: Int!
        $cancellationPolicy: Int!
        $specialPricing: String
        $isSpecialPriceAssigned: Boolean
        $isSpecialPriceAverage: Float
        $dayDifference: Float
        $startTime: Float
        $endTime: Float
        $licenseNumber: String!
        $firstName: String!
        $middleName: String
        $lastName: String!
        $dateOfBirth: String!
        $countryCode: String
        $securityDeposit: Float
        $paymentMethod: String!
        $token: String!
      ) {
        createReservation(
          listId: $listId
          hostId: $hostId
          guestId: $guestId
          checkIn: $checkIn
          checkOut: $checkOut
          guests: $guests
          message: $message
          basePrice: $basePrice
          delivery: $delivery
          currency: $currency
          discount: $discount
          discountType: $discountType
          guestServiceFee: $guestServiceFee
          hostServiceFee: $hostServiceFee
          total: $total
          bookingType: $bookingType
          paymentType: $paymentType
          cancellationPolicy: $cancellationPolicy
          specialPricing: $specialPricing
          isSpecialPriceAssigned: $isSpecialPriceAssigned
          isSpecialPriceAverage: $isSpecialPriceAverage
          dayDifference: $dayDifference
          startTime: $startTime
          endTime: $endTime
          licenseNumber: $licenseNumber
          firstName: $firstName
          middleName: $middleName
          lastName: $lastName
          dateOfBirth: $dateOfBirth
          countryCode: $countryCode
          securityDeposit: $securityDeposit
          paymentMethod: $paymentMethod
          token: $token
        ) {
          id
          listId
          hostId
          guestId
          checkIn
          checkOut
          guests
          message
          basePrice
          delivery
          currency
          discount
          discountType
          guestServiceFee
          hostServiceFee
          total
          confirmationCode
          createdAt
          status
          paymentMethodId
          cancellationPolicy
          isSpecialPriceAverage
          dayDifference
        }
      }
    `;

    let preApprove,
      bookingTypeData,
      cancellationPolicy,
      isStartValue,
      isStartDate,
      checkInDate,
      checkOutDate,
      isEndDate,
      isEndValue;
    preApprove = getState().book.bookDetails.preApprove;
    bookingTypeData = preApprove ? "instant" : bookingType;
    cancellationPolicy = getState().book.data.listingData.cancellation.id;
    (isStartValue = startTimeData(startTime)), (isEndValue = startTimeData(endTime));
    (isStartDate = moment(checkIn).format("YYYY-MM-DD")),
      (isEndDate = moment(checkOut).format("YYYY-MM-DD"));
    (checkInDate = moment.utc(isStartDate + " " + isStartValue)),
      (checkOutDate = moment.utc(isEndDate + " " + isEndValue));

    const { data } = await client.mutate({
      mutation,
      variables: {
        listId,
        hostId,
        guestId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        message,
        basePrice,
        delivery,
        currency,
        discount,
        paymentType,
        discountType,
        guestServiceFee,
        hostServiceFee,
        total,
        bookingType: bookingTypeData,
        cancellationPolicy,
        specialPricing,
        isSpecialPriceAssigned,
        isSpecialPriceAverage,
        dayDifference,
        startTime,
        endTime,
        licenseNumber,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        countryCode,
        securityDeposit,
        paymentMethod,
        token,
      },
    });

    if (data && data.createReservation) {
      let reservationId = data.createReservation.id;
      let amount = total + guestServiceFee + securityDeposit;
      let rates = getState().currency.rates;
      let currentCurrency = getState().currency.to
        ? getState().currency.to
        : getState().currency.base;
      let baseCurrency = getState().currency.base;

      const convertedAmount = convert(baseCurrency, rates, amount, currency, currentCurrency);
      console.log(paymentMethod);
      let reservationDetails = {
        reservationId,
        listId,
        hostId,
        guestId,
        guestEmail,
        title,
        amount: Math.ceil(convertedAmount),
        currency: currentCurrency,
      };

      const paymentData = await processOpnPaymentsPayment(
        "reservation",
        reservationDetails,
        paymentMethod,
        token,
      );

        console.log(paymentData);

      if(paymentData.success) {
        window.location.href = paymentData.redirectUrl;
        dispatch({
          type: BOOKING_PAYMENT_SUCCESS,
          payload: { paymentLoading: true },
        });
      }
      else {
        dispatch({
          type: BOOKING_PAYMENT_ERROR,
          payload: { paymentLoading: false },
        });
        return false;
      }
    }

    dispatch({
      type: BOOKING_PAYMENT_SUCCESS,
      payload: { paymentLoading: false },
    });
    // } catch (error) {
    //   dispatch({
    //     type: BOOKING_PAYMENT_ERROR,
    //     payload: {
    //       error,
    //       paymentLoading: false,
    //     },
    //   });
    //   return false;
    // }

    return true;
  };
}

// if (paymentType == 1) {
//   convertedAmount = convert(baseCurrency, rates, amount, currency, paymentCurrency);
// const { status, errorMessage } = await sendPayment(reservationId, convertedAmount.toFixed(2), paymentCurrency, title);
//   if (status == 400) {
//     errorMessage ? toastr.error('Failed!', errorMessage) : '';
//     dispatch({
//       type: BOOKING_PAYMENT_ERROR,
//       payload: { paymentLoading: false }
//     });
//   } else {
//     dispatch({
//       type: BOOKING_PAYMENT_SUCCESS,
//       payload: { paymentLoading: false }
//     });
//   }

// } else {
//   convertedAmount = convert(baseCurrency, rates, amount, currency, currentCurrency);
//   let cardDetails = {
//     // name,
//     // number: cardNumber,
//     // exp_month: expiryDate,
//     // exp_year: expiryYear,
//     // cvc: cvv
//   };
//   let reservationDetails = {
//     reservationId,
//     listId,
//     hostId,
//     guestId,
//     guestEmail,
//     title,
//     amount: convertedAmount.toFixed(2),
//     currency: currentCurrency
//   };

//   const { status, errorMessage, paymentIntentSecret } = await processStripePayment(
//     'reservation',
//     cardDetails,
//     reservationDetails,
//     paymentMethodId
//   );

//   if (status === 200) {
//     dispatch({
//       type: BOOKING_PAYMENT_SUCCESS,
//       payload: { paymentLoading: true }
//     });

//     return {
//       status
//     }

//   } else {
//     errorMessage ? toastr.error('Failed!', errorMessage) : '';
//     dispatch({
//       type: BOOKING_PAYMENT_ERROR,
//       payload: { paymentLoading: false }
//     });

//     return {
//       status,
//       paymentIntentSecret,
//       reservationId
//     }
//   }
// }
