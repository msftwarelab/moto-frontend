import { payment } from "../../../../config";
import { Reservation, User } from "../../../../data/models";

import { updateReservation } from "../../updateReservation";
import { createThread } from "../helpers/createThread";
import { blockDates } from "../../blockDates";
import { createTransaction } from "../helpers/createTransaction";
import { emailBroadcast } from "../helpers/email"; 

const omise = require("omise")({
  publicKey: payment.opnPayments.publicKey,
  secretKey: payment.opnPayments.secretKey,
});

export const opnPaymentsPaymentComplete = (app) => {
  app.post("/opnPayments-payment-complete", async function(req, res) {
    // res.send({success: true})
    try {
      const { reservationId } = req.body;

      const reservation = await Reservation.findOne({
        where: {
          id: reservationId,
        },
      });
      if (reservation) {
        const {
          guestId,
          total,
          currency,
          paymentMethodId,
          paymentIntentId,
        } = await Reservation.findOne({
          where: {
            id: reservation.id,
          },
        });
        const { email: guestEmail } = await User.findOne({
          where: {
            id: guestId,
          },
        });
        const { customer: customerId } = await omise.charges.retrieve(paymentIntentId);

        res.send({
          customerId, guestEmail, guestId, total
        });
        return;
    

        await updateReservation(reservationId, paymentIntentId);
        await createThread(reservationId);
        await blockDates(reservationId);
        await createTransaction(
          reservationId,
          guestEmail,
          customerId,
          paymentIntentId,
          total,
          currency,
          "booking",
          paymentMethodId
        );
        await emailBroadcast(reservationId);

        res.send({
          success: true,
        });
      }
      else {
        res.send({
            success: false,
            message: "Reservation not found",
        })
      }
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });
};
