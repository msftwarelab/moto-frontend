import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookYourCar.css';
import cs from '../../commonStyle.css'
import cx from 'classnames';

//Image
import icon from '/public/SiteIcons/streeingWheel.svg';
import Translation from '../../Translation/Translation';

class BookYourCar extends React.Component {

    render() {
        const { infoCollection } = this.props;

        return (
            <div className={s.bookGrid}>
                {infoCollection && <><img src={`/images/home/${infoCollection.image}`} className={cs.fullWidth} />
                    <div className={cx(s.paddingLeft, 'paddingLeftBookRTL')}>
                        <h2 className={cx(cs.commonTitleText, cs.fontWeightBold)}>
                            <Translation identifier="findyourcar.heading">{infoCollection.heading}</Translation>
                        </h2>
                        <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <Translation identifier="findyourcar.content1">{infoCollection.content1}</Translation>
                        </div>
                        <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <Translation identifier="findyourcar.content2">{infoCollection.content2}</Translation>
                        </div>
                        <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <Translation identifier="findyourcar.content3">{infoCollection.content3}</Translation>
                        </div>
                        {infoCollection.content4 && <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <Translation identifier="findyourcar.content4">{infoCollection.content4}</Translation>
                        </div>}
                        {infoCollection.content5 && <div className={cx(cs.commonContentText, cs.paddingTop4, s.bookFlex)}>
                            <img src={icon} className={cx(s.iconCss, 'iconCssBookRTL')} />
                            <span>{infoCollection.content5}</span>
                            <Translation identifier="findyourcar.content5">{infoCollection.content5}</Translation>
                        </div>}
                        <a href={infoCollection.buttonLink} target="_blank" className={cx(cs.btnPrimary, cs.spaceTop4, cs.displayinlineBlock)}>
                            <Translation identifier="findyourcar.buttonLabel">{infoCollection.buttonLabel}</Translation>
                        </a>
                    </div> </>}
            </div>
        );
    }

}

export default withStyles(s, cs)(BookYourCar);