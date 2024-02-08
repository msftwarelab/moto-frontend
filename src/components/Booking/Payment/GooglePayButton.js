import React, { useRef } from "react";
import GooglePayButton from "@google-pay/button-react";

export const GoogleButton = ({ children }) => {
  const btnRef = useRef(null);
  console.log(btnRef);

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          // Replace with your payment gateway and your gateway's merchant identifier
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId",
          },
        },
      },
    ],
    merchantInfo: {
      // Replace with your merchant information
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: "123.45", // Your transaction
      // Additional transaction information
    },
    callbackIntents: ["PAYMENT_AUTHORIZATION"],
  };

  const onLoadPaymentData = (paymentData) => {
    console.log("Success", paymentData);
    // Here you will handle the paymentData, sending it to your server for processing
    // The paymentData.paymentMethodData.tokenizationData.token is what you'll likely send
  };

  const onPaymentAuthorized = (paymentData) => {
    // Perform any additional validation or processing here if necessary
    // You can also send the payment token to your server here

    // Return an object with a status to indicate whether the payment was successful
    return { transactionState: "SUCCESS" };
  };

  const onError = (error) => {
    console.error("Payment Error:", error);
    // Handle payment errors here
  };

  return (
    <div>
      <div
        onClick={() => {
          const googlePayBtn = document.querySelector(".google-pay-button-container button");
          googlePayBtn.click();
        }}
      >
        {children}
      </div>
      <div style={{ display: "none" }}>
        <GooglePayButton
          ref={btnRef}
          environment="TEST" // Use "PRODUCTION" when you're ready to go live
          paymentRequest={paymentRequest}
          onLoadPaymentData={onLoadPaymentData}
          onPaymentAuthorized={onPaymentAuthorized}
          onError={onError}
          buttonColor="black"
          buttonType="buy"
          buttonSizeMode="fill"
          className="google-pay-button"
        />
      </div>
    </div>
  );
};
