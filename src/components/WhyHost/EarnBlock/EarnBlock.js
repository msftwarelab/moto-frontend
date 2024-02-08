import React, { Component } from 'react';
import {
  Grid
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EarnBlock.css';
import { injectIntl } from 'react-intl';
import Translation from '../../Translation/Translation';
class EarnBlock extends Component {

  render() {
    const { data } = this.props
    return (
      <Grid className={s.centerBlock}>
        <div className={s.mainBlock}>
          <h2 className={s.heading}>
            {data && <Translation identifier="earnBlockTitle1">{data.earnBlockTitle1}</Translation>}
          </h2>
          <h3 className={s.estimate}>
            {data && <Translation identifier="earnBlockContent1">{data.earnBlockContent1}</Translation>}
          </h3>
        </div>
      </Grid>
    );
  }
}

export default injectIntl(withStyles(s)(EarnBlock));
