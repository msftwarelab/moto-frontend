import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Row,
  Col,
  Grid
} from 'react-bootstrap';
import cx from 'classnames';
import s from './Feedback.css';
import cs from '../commonStyle.css';


// Image icons
import iconOne from '/public/SiteIcons/supportIconOne.svg';
import iconTwo from '/public/SiteIcons/supportIconTwo.svg';
import iconThree from '/public/SiteIcons/supportIconThree.svg';
import Translation from '../Translation/Translation';
import { identifier } from '@babel/types';

class Feedback extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getFooterSetting: PropTypes.shape({
        title1: PropTypes.string.isRequired,
        content1: PropTypes.string.isRequired,
        title2: PropTypes.string.isRequired,
        content2: PropTypes.string.isRequired,
        title3: PropTypes.string.isRequired,
        content3: PropTypes.string.isRequired,
      })
    }),
  };

  render() {
    const { data: { loading, getFooterSetting } } = this.props;

    if (!loading) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.feedbackContainer}>
                <Row className={s.feedbackRow}>

                  {
                    getFooterSetting && <Col
                      xs={12} sm={4} md={4} lg={4}
                      className={cx(s.feedbackBox, s.borderRight, 'borderRightFeedRTL')}>
                      <img src={iconOne} />
                      <div>
                        <label className={cx(cs.commonSubTitleText, cs.paddingTop4, cs.fontWeightBold)}>
                          <Translation identifier="footer.title2">
                            {getFooterSetting.title1}
                          </Translation>
                        </label>
                        <label className={cx(cs.paddingTop2, cs.commonContentText, cs.fontWeightNormal, s.textColor)}>
                          <Translation identifier="footer.content2">
                            {getFooterSetting.content1}
                          </Translation>
                        </label>
                      </div>
                    </Col>
                  }
                  {
                    getFooterSetting && <Col
                      xs={12} sm={4} md={4} lg={4}
                      className={cx(s.feedbackBox, s.borderRight, 'borderRightFeedRTL')}
                    >
                      <img src={iconTwo} />
                      <div className={cx(s.feedbackContent, 'textAlignRightRTL')}>
                        <label className={cx(cs.commonSubTitleText, cs.paddingTop4, cs.fontWeightBold)}>
                          <Translation identifier="footer.title2">
                            {getFooterSetting.title2}
                          </Translation>
                        </label>
                        <label className={cx(cs.paddingTop2, cs.commonContentText, cs.fontWeightNormal)}>
                          <Translation identifier="footer.content2">
                            {getFooterSetting.content2}
                          </Translation>
                        </label>
                      </div>
                    </Col>
                  }
                  {
                    getFooterSetting && <Col
                      xs={12} sm={4} md={4} lg={4}
                      className={cx(s.feedbackBox)}
                    >
                      <img src={iconThree} />

                      <div className={cx(s.feedbackContent, 'textAlignRightRTL')}>
                        <label className={cx(cs.commonSubTitleText, cs.paddingTop4, cs.fontWeightBold)}>
                          <Translation identifier="footer.title2">
                            {getFooterSetting.title3}
                          </Translation>
                        </label>
                        <label className={cx(cs.paddingTop2, cs.commonContentText, cs.fontWeightNormal)}>
                          <Translation identifier="footer.content2">
                            {getFooterSetting.content3}
                          </Translation>
                        </label>
                      </div>
                    </Col>
                  }
                </Row>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />
    }
  }
}

export default compose(
  injectIntl,
  withStyles(s, cs),
  graphql(gql`
   query getFooterSetting {
    getFooterSetting {
        id
        title1
        content1
        title2
        content2
        title3
        content3
      }
    }
`, { options: { ssr: true } })
)(Feedback);
