import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Works.css';
import cs from '../../commonStyle.css';
import Translation from '../../Translation/Translation';
class Works extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { data } = this.props
    return (
      <div className={s.container}>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} className={s.centerDevice}>
            <img src={'/images/home/' + data.workImage4} className={s.imgWidth} />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h3 className={cx(s.heading)}>
              {data && <Translation identifier="whyBlock5workTitleHeading">{data.workTitleHeading}</Translation>}
            </h3>
            <div className={cx(s.whyblock)}>
              <h4 className={s.common}>
                {data && <Translation identifier="whyBlock5peaceTitle1">{data.peaceTitle1}</Translation>}
              </h4>
              <p className={s.common}>
                {data && <Translation identifier="whyBlock5peaceContent1">{data.peaceContent1}</Translation>}
              </p>
            </div>
            <div className={cx(s.whyblock, cs.spaceTop6)}>
              <h4 className={s.common}>
                {data && <Translation identifier="whyBlock5peaceTitle2">{data.peaceTitle2}</Translation>}
              </h4>
              <p className={s.common}>
                {data && <Translation identifier="whyBlock5peaceContent2">{data.peaceContent2}</Translation>}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(s, cs)(Works);
