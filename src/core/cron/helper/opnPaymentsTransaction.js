// import omise from 'omise'; // This is assuming omise provides a similar package for server-side operations
// import { payment } from '../../../config';
// const omiseClient = omise({
//   publicKey: payment.opnPayments.publicKey,
//   secretKey: payment.opnPayments.secretKey,
// });

import { Reservation, TransactionHistory } from "../../../data/models";
import { isZeroDecimalCurrency } from "../../../helpers/zeroDecimalCurrency";

export async function opnPaymentsPayment(
  reservationId,
  hostId,
  amount,
  currency,
  hostEmail,
  paymentAttempt,
  payoutId,
  paymentMethodId
) {
  try {
    let updateAttempt = await Reservation.update(
      {
        paymentAttempt: paymentAttempt + 1,
      },
      {
        where: {
          id: reservationId,
        },
      }
    );

    // let payout = await omiseClient.transfers.create({
    //     amount: isZeroDecimalCurrency(currency) ? Math.round(amount) : Math.round(amount * 100),
    //     currency,
    //     recipient: payEmail, // In Omise, you might need to handle recipients differently
    //     metadata: {
    //         reservationId,
    //         type: 'payout',
    //         hostEmail
    //     }
    // });

    payout = await omise.transfers.create({
      amount: isZeroDecimalCurrency(currency) ? Math.round(amount) : Math.round(amount * 100),
      recipient: hostEmail, // Recipient ID or bank account ID
      currency: currency,
      metadata: {
        reservationId,
        type: "payout",
        hostEmail: hostEmail,
      },
    });

    if (payout && payout.id) {
      const createTransaction = await TransactionHistory.create({
        reservationId,
        userId: hostId,
        payoutId,
        payoutEmail: hostEmail,
        amount,
        currency,
        transactionId: payout.id,
        paymentMethodId: paymentMethodId,
        payoutType: "payout",
      });

      if (createTransaction) {
        return {
          status: 200,
        };
      }
    }
  } catch (error) {
    return {
      status: 400,
      errorMessage: error,
    };
  }
}
