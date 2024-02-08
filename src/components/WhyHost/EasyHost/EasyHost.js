import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EasyHost.css';
import cs from '../../commonStyle.css';
import { injectIntl } from 'react-intl';
import Translation from '../../Translation/Translation';
import {
  Row, Col
} from 'react-bootstrap';


class EasyHost extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { data } = this.props
    return (
      <div className={s.container}>
        <div className={s.bgColor}>
          <h2 className={s.heading}>
            {data && <Translation identifier="whyBlock4easyHostTitle1">{data.easyHostTitle1}</Translation>}
          </h2>
          <Row>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.columnPaddingOne, 'columnPaddingOneRTL')}>
              <img src={'/images/home/' + data.workImage1} className={s.imgWidth} />
              <h4 className={cx(cs.commonTotalText, cs.spaceBottom3, cs.spaceTop4, s.textWhite)}>{data && <Translation identifier="whyBlock4easyHostContent1">{data.easyHostContent1}</Translation>}
              </h4>
              <p className={s.desc}>
                {data && <Translation identifier="whyBlock4easyHostContent2">{data.easyHostContent2}</Translation>}
              </p>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12}>
              <img src={'/images/home/' + data.workImage2} className={s.imgWidth} />
              <h4 className={cx(cs.commonTotalText, cs.spaceBottom3, cs.spaceTop4, s.textWhite)}>{data && <Translation identifier="whyBlock4workTitle1">{data.workTitle1}</Translation>}</h4>
              <p className={s.desc}>
                {data && <Translation identifier="whyBlock4workContent1">{data.workContent1}</Translation>}
              </p>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className={cx(s.columnThreePadding, 'columnThreePaddingRTL')}>
              <img src={'/images/home/' + data.workImage3} className={s.imgWidth} />
              <h4 className={cx(cs.commonTotalText, cs.spaceBottom3, cs.spaceTop4, s.textWhite)}>{data && <Translation identifier="whyBlock4workTitle2">{data.workTitle2}</Translation>}</h4>
              <p className={s.desc}>
                {data && <Translation identifier="whyBlock4workContent2">{data.workContent2}</Translation>}
              </p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s, cs)(EasyHost));
