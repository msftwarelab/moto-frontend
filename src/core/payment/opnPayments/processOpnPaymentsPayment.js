import fetch from "../../fetch/fetch.server";

export async function processOpnPaymentsPayment(type, reservationDetails, paymentMethod, token) {
  /*let amount= 10;
    let currency = 'USD';
    let description = 'Just testing';*/
  let URL;
  let variables;
  if (type === "reservation") {
    URL = "/opnPayments-add-reservation";
    variables = {
      token: token,
      paymentMethod: paymentMethod,
      currency: reservationDetails.currency,
      amount: Math.ceil(reservationDetails.amount),
      reservationId: reservationDetails.reservationId,
    };
  } else if (type === "remainingPayment") {
    URL = "/remaining-payment";
  } else if (type === "refund") {
    URL = "/opnPayments-refund";
  } else if (type === "payout") {
    URL = "/opnPayments-payout";
  } else if (type === "addPayout") {
    URL = "/opnPayments-add-payout";
    // variables = {
    //   token: token,
    //   paymentMethod: paymentMethod,
    //   currency: reservationDetails.currency,
    //   amount: reservationDetails.amount,
    //   reservationId: reservationDetails.reservationId,
    // };
  } else if (type === "verifyPayout") {
    URL = "/opnPayments-verify-payout";
    variables = {
      userDetails: cardDetails,
    };
  } else if (type === "getCustomer") {
    URL = "/opnPayments-get-customer";
  } else if (type === "account") {
    URL = "/opnPayments-create-account";
  } else if (type === "source") {
    URL = "/opnPayments-create-source";
  } else if (type === "confirmReservation") {
    URL = "/opnPayments-reservation-confirm";
    variables = {
      confirmPaymentIntentId,
      reservationDetails,
    };
  }
  const resp = await fetch(URL, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(variables),
    // credentials: 'include'
  });
  //return await resp.json();

  const data = await resp.json();

  // if(status === 200 && redirect) {
  //     window.location = redirect;
  // }

  // if (status === 200 && serverRedirect) {
  //     window.location = serverRedirect;
  // }

  // return {
  //     status,
  //     errorMessage,
  //     accountId,
  //     isVerified,
  //     paymentIntentSecret
  // }
  return data;
}
