import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SharingSection.css';
import cs from '../../commonStyle.css';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import messages from '../../../locale/messages';
// Actions
import {
  openSignupModal
} from '../../../actions/modalActions';
//Image
import icon from '/public/SiteIcons/becomeaHostIcon.svg';
import shareIcon from '/public/SiteIcons/shareLoveIcon.png'
import Translation from '../../Translation/Translation';



class SharingSection extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { openSignupModal, isAuthenticated, data } = this.props;

    return (
      <div className={s.easyImage}>
        <div className={s.container}>
          <h2 className={s.heading}> {data && <Translation identifier="whyBlock6peaceTitle3">{data.peaceTitle3}</Translation>} <img src={shareIcon} className={s.shareIconCss}/></h2>
          <h3 className={s.desc}>{data && <Translation identifier="whyBlock6peaceContent3">{data.peaceContent3}</Translation>}</h3>
              {
                !isAuthenticated && <div className={s.flexCenter}><Button
                  className={cx(cs.btnPrimary, s.btnCss, cs.dFlex)}
                  onClick={openSignupModal}
                >
                  <img src={icon} className='imgIconRight'/>
                  <FormattedMessage {...messages.becomeAHost} />
                </Button>
                </div>
              }
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  isAuthenticated: state.runtime.isAuthenticated
});

const mapDispatch = {
  openSignupModal
};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(SharingSection)));
