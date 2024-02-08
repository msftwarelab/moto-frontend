// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Helpers
import validateStep2 from './validateStep2';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Component
import ListPlaceTips from '../ListPlaceTips';

import updateStep2 from './updateStep2';
import CommonFormComponent from '../CommonField/CommonFormComponent';

class Title extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      chars_left: 50
    };
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { listingFields, valid } = this.props;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    /*if(listingFields != undefined) {
      this.setState({ });
    }*/
  }

  componentDidMount() {
    const { title } = this.props;
    let max_chars = title ? 50 - title.length : 50;
    this.setState({
      chars_left: max_chars
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields, valid } = nextProps;
    const { title } = nextProps;
    let max_chars = title ? 50 - title.length : 50;
    this.setState({
      chars_left: max_chars
    });

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
    /*if(listingFields != undefined) {
      this.setState({ });
    }*/
  }

  handleChange(event) {
    var input = event.target.value;
    let max_chars = 300;
    this.setState({
      chars_left: max_chars - input.length
    });
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, invalid } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled, chars_left } = this.state;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={7} md={7} lg={7} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.placeTitle} /></h3>
              <p className={cx(s.landingStep3, s.space3)}><span><FormattedMessage {...messages.moreRenters} /></span></p>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <h3 className={cx(s.noMarginMaximum, s.maximumSpace2)}>
                    <span className={s.maximumCharcter}>
                      <FormattedMessage {...messages.maximumCharcter} />
                    </span>
                  </h3>
                  <p className={s.maximumCharColor}>
                    {chars_left} <FormattedMessage {...messages.maximumCharcterLeft} />
                  </p>
                  <FormGroup className={s.formGroup}>
                    <Field name="title"
                      type="text"
                      component={CommonFormComponent}
                      label={formatMessage(messages.titleLabel)}
                      inputClass={cx(s.formControlInput, s.jumboInput)}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft, 'floatRightRTL')} onClick={() => previousPage("description")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight, 'floatLeftRTL')} type="submit" disabled={isDisabled}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
          <ListPlaceTips />
        </Row>
      </Grid>
    );
  }
}

Title = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(Title);

const selector = formValueSelector('ListPlaceStep2');


const mapState = (state) => ({
  listingFields: state.listingFields.data,
  title: selector(state, 'title')
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Title)));
