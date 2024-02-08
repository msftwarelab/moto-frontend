import { gql } from "react-apollo";
// Toaster
import { toastr } from "react-redux-toastr";

import {
  ADMIN_PAYOUT_HOST_START,
  ADMIN_PAYOUT_HOST_SUCCESS,
  ADMIN_PAYOUT_HOST_ERROR,
} from "../../constants";

import { sendPaymentToHost } from "../../core/payment/payout/sendPaymentToHost";
// Helper
import { convert } from "../../helpers/currencyConvertion";
// Stripe
import { processStripePayment } from "../../core/payment/stripe/processStripePayment";
import { processOpnPaymentsPayment } from "../../core/payment/opnPayments/processOpnPaymentsPayment";

export function payoutHost(
  reservationId,
  destination,
  payoutId,
  amount,
  currency,
  paymentCurrency,
  userId,
  paymentMethodId,
  hostEmail,
  changeState
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADMIN_PAYOUT_HOST_START,
      payload: {
        loading: true,
        reservationId,
      },
    });

    try {
      let rates = getState().currency.rates;
      let baseCurrency = getState().currency.base;
      let convertedAmount = convert(baseCurrency, rates, amount, currency, paymentCurrency);

      let cardDetails = {};
      let reservationDetails = {
        reservationId,
        amount: convertedAmount.toFixed(2),
        currency: paymentCurrency,
        hostEmail,
        payoutId,
        userId,
        destination,
        transfer_group: "Payout to Host",
      };
      const { status, errorMessage } = await processOpnPaymentsPayment(
        "payout",
        cardDetails,
        reservationDetails
      );

      if (status && status === 200) {
        dispatch({
          type: ADMIN_PAYOUT_HOST_SUCCESS,
          payload: {
            loading: false,
            completed: true,
          },
        });
        if (changeState) changeState("successPayout", reservationId);
        toastr.success("Payment to Host", "Payment transferred to host successfully!");
      } else {
        toastr.error("Payment to Host", errorMessage);
        dispatch({
          type: ADMIN_PAYOUT_HOST_ERROR,
          payload: {
            loading: false,
          },
        });
      }
      if (changeState) changeState("removePayout", reservationId);
    } catch (error) {
      dispatch({
        type: ADMIN_PAYOUT_HOST_ERROR,
        payload: {
          error,
          loading: false,
        },
      });
      if (changeState) changeState("removePayout", reservationId);
      return false;
    }

    return true;
  };
}
