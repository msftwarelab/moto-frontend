import stripePackage from "stripe";
import { payment, url } from "../../../config";
import { isEuropeCountry } from "../../../helpers/europeCountryHelpers";
const stripe = stripePackage(payment.stripe.secretKey, {
  apiVersion: "2019-12-03",
});

export const opnPaymentsAddPayout = (app) => {
  app.post("/opnPayments-add-payout", async function(req, res) {
    try {
      const { paymentMethod, token, amount, currency, reservationId } = req;
      // const source = omise.sources.create({
      //   type: paymentMethod,
      //   amount: 10000,
      //   currency: "THB",
      //   token: token,
      // });


      console.log(token);

      const charge = await omise.charges.create({
        amount: amount, // Amount in the smallest unit of your currency
        currency: currency,
        return_uri: `/payment/${reservationId}`,
        source: source.id,
      });

      res.send({
        success: true,
        authorizeUri: charge.authorize_uri, // Redirect URL for 3DS authentication
        chargeId: charge.id,
        status: charge.status,
      });
    } catch (error) {
      console.error("Error creating charge:", error);
      res.send({
        success: false,
        message: error.message,
      });
    }
  });
};
