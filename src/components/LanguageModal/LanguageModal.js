// General
import React from 'react';

import { connect } from 'react-redux';
import { setLocale } from '../../actions/intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LanguageModal.css';

import { closeHeaderModal } from '../../actions/modalActions';

import moment from 'moment';
import { formatLocale, isRTL } from '../../helpers/formatLocale';

class LanguageModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(value) {
    const { setLocale, closeHeaderModal, currentLocale } = this.props;
    const isRtlLocale = value && isRTL(value) || false;
    // Adding Bootstrap RTL style link

    await closeHeaderModal('languageModal');
    if (isRtlLocale) {
      // Add "rtl" class name to the body element
      document.body.classList.add(`rtl`);
    } else if (isRTL(currentLocale) && !isRtlLocale) {
      // Remove RTL stylesheet Link element
      let rtlStyleElement = document.getElementById('rtl-style');
      rtlStyleElement.parentNode.removeChild(rtlStyleElement);
      // Remove the RTL classname from the body element
      let bodyElement = document.body;
      bodyElement.className = bodyElement.className.replace(/\brtl\b/g, "");
    }

    // Update the locale
    setLocale({ locale: value });
    // Update Moment locale
    moment.defineLocale(value + '-dup', {
      parentLocale: isRTL(value) ? value : 'en',
      preparse: function (string) {
        return string;
      },
      postformat: function (string) {
        return string;
      }
    });
  }

  render() {
    const { currentLocale, availableLocales, closeHeaderModal } = this.props;
    let localeList = availableLocales && availableLocales.filter(o => o !== currentLocale);

    let headID = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'rtl-style'
    link.href = '/css/app-rtl.min.css';
    headID.appendChild(link);

    return (
      <div>
        <div onClick={() => closeHeaderModal('languageModal')} className={cx(s.mainSection)}>
          <div className={cx(s.activeItem, s.activeSection)}>
            {formatLocale(currentLocale)}
          </div>
        </div>
        {
          localeList && localeList.length > 0 && localeList.map((item, key) => {
            return (
              <div key={key} onClick={() => this.handleChange(item)} className={cx(s.mainSection)}>
                <div className={cx(s.activeItem)}>
                  {formatLocale(item)}
                </div>
              </div>
            )
          })
        }
      </div>
    );

    return (
      <div>
        <div onClick={() => closeHeaderModal('languageModal')}
          className={cx(s.mainSection, 'lanItemLinkSection', 'lanItemLinkSectionRTL')}
        >
          <div
            className={cx(s.activeItem, s.activeSection, 'lanItemLink')}
          >
            {formatLocale(currentLocale)}
          </div>
        </div>
        {
          localeList && localeList.length > 0 && localeList.map((item, key) => {
            return (
              <div onClick={() => this.handleChange(item)}
                className={cx(s.mainSection, 'lanItemLinkSection', 'lanItemLinkSectionRTL')}
              >
                <div
                  className={cx(s.activeItem, 'lanItemLink')}
                >
                  {formatLocale(item)}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }

}

const mapState = state => ({
  availableLocales: state.runtime.availableLocales,
  currentLocale: state.intl.locale,
});

const mapDispatch = {
  setLocale,
  closeHeaderModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(LanguageModal));
