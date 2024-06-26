import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout4.css';
import bt from '../../commonStyle.css';
import cx from 'classnames';
import SearchForm from '../SearchForm/SearchForm';
import Translation from '../../Translation/Translation';

class Layout4 extends React.Component {
  

  render() {
    const { title, content, bannerImage } = this.props;
    return (
      <div className={s.bgCss} style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className={s.sectionWidth}>
          <SearchForm />
          <div>
            <h1 className={cx(s.bannerCaptionText, bt.paddingTop5)}>
              <Translation identifier="caption.title">{title}</Translation>
              {' '} <Translation identifier="caption.content">{content}</Translation>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s, bt)(Layout4);