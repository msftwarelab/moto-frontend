import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";

import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Payment.css";
import Payment from "../../components/Payment";

// GraphQl
import getPaymentDataQuery from "./getPaymentData.graphql";

// // Components
import Loader from "../../components/Loader";
import NotFound from "../notFound/NotFound";
import { loadingBarMiddleware } from "react-redux-loading-bar";

class PaymentContainer extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    paymentData: PropTypes.shape({
      loading: PropTypes.bool,
      getPaymentData: PropTypes.object,
    }),
  };

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    console.log(this.props);
    if (!this.props.paymentData.loading && this.props.paymentData.getPaymentData) {
      fetch("/opnPayments-payment-complete", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reservationId: this.props.reservationId }),
      });
    }
  }

  render() {
    const {
      paymentData: { loading, getPaymentData },
    } = this.props;

    if (!loading && !getPaymentData) {
      return <NotFound />;
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          {loading ? <Loader type={"text"} /> : <Payment data={getPaymentData} />}
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getPaymentDataQuery, {
    name: "paymentData",
    options: (props) => ({
      variables: {
        reservationId: props.reservationId,
      },
    }),
  })
)(PaymentContainer);
