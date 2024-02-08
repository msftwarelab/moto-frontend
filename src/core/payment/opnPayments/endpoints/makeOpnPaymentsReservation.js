import { payment } from "../../../../config";
import { getCustomerId } from "../helpers/getCustomerId";
import { updateUserProfile } from "../helpers/updateUserProfile";
import { updateReservation } from "../helpers/updateReservation";
import { createTransaction } from "../helpers/createTransaction";
import { createThread } from "../helpers/createThread";
import { blockDates } from "../helpers/blockDates";
import { emailBroadcast } from "../helpers/email";
import { isZeroDecimalCurrency } from "../../../../helpers/zeroDecimalCurrency";
import e from "express";
import { Reservation } from "../../../../data/models";
import { baseUrl } from "../../../../config";

const omise = require("omise")({
  publicKey: payment.opnPayments.publicKey,
  secretKey: payment.opnPayments.secretKey,
});

export const opnPaymentsMakeReservation = (app) => {
  app.post("/opnPayments-add-reservation", function(req, res) {
    const { token, amount, currency, reservationId, paymentMethod } = req.body;

    console.log(token);

    if (paymentMethod === "creditCard") {
      omise.charges.create(
        {
          amount: Math.ceil(amount), // Amount in the smallest unit of your currency
          currency: currency,
          return_uri: `${baseUrl}/payment/${reservationId}`,
          card: token,
        },
        async function(error, charge) {
          if (error) {
            console.error("Error creating charge:", error);
            res.send({
              success: false,
              message: error.message,
            });
          } else {
            await Reservation.update(
              { paymentIntentId: charge.id },
              {
                where: {
                  id: reservationId,
                },
              }
            );
            // console.log(charge);
            // res.send({
            //   success: true,
            //   authorizeUri: charge.authorize_uri, // Redirect URL for 3DS authentication
            //   chargeId: charge.id,
            //   status: charge.status,
            // });
            //   res.redirect(charge.authorize_uri);
            res.send({
              success: true,
              status: 200,
              redirectUrl: charge.authorize_uri,
              chargeId: charge.id,
            });
          }
        }
      );
    } else {
      omise.charges.create(
        {
          amount: Math.ceil(amount), // Amount in the smallest unit of your currency
          currency: currency,
          return_uri: `${baseUrl}/payment/${reservationId}`,
          source: token,
        },
        async function(error, charge) {
          if (error) {
            console.error("Error creating charge:", error);
            res.send({
              success: false,
              message: error.message,
            });
          } else {
            await Reservation.update(
              { paymentIntentId: charge.id },
              {
                where: {
                  id: reservationId,
                },
              }
            );
            res.send({
              success: true,
              redirectUrl: charge.authorize_uri, // Redirect URL for 3DS authentication
              chargeId: charge.id,
              status: charge.status,
            });
          }
        }
      );
    }
  });
};
