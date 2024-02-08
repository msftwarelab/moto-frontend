import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

import { compose } from 'react-apollo';
import { connect } from 'react-redux';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Col,
  FormGroup,
  Row,
} from 'react-bootstrap';
import cp from '../../../components/commonStyle.css';
import s from './BannerSettingsForm.css';

import PictureImage from '../../../../public/AdminIcons/default.svg';
import Loader from '../../Loader';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import { doUploadHomeBanner, startBannerUploaderLoader, stopBannerUploaderLoader } from '../../../actions/siteadmin/manageHomepageBanner';
import messages from '../../../locale/messages';
import AdminTranslateButton from '../../AdminTranslateButton/AdminTranslateButton';
import CommonFormComponent from '../../CommonField/CommonFormComponent';
import ImageUploadComponent from '../ImageUploadComponent/ImageUploadComponent';
class BannerSettingsForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
    startBannerUploaderLoader: PropTypes.any.isRequired,
    doUploadImageBanner: PropTypes.any.isRequired
  };

  success = async (file, fromServer) => {
    const { doUploadHomeBanner, image, id, startBannerUploaderLoader, stopBannerUploaderLoader } = this.props;
    let fileName = fromServer.file.filename;
    let oldImage = image || null;
    startBannerUploaderLoader();
    doUploadHomeBanner(fileName, oldImage, id);
    stopBannerUploaderLoader();
  }

  render() {

    const { error, handleSubmit, submitting, dispatch, initialValues, title, bannerUploaderLoading, image, id } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className='listPhotoContainer'>
        <div className={cx(s.pagecontentWrapper, 'pagecontentWrapperRTL', 'adminPhotoUplod', 'dzInputContainer')}>
          <div className={cx(cp.adminContentPadding)}>
            <div className={s.sectionCenter}>
              <div className={cp.commonAdminBorderSection}>
                <h1 className={s.headerTitle}><FormattedMessage {...messages.bannerSettings} /></h1>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.homeBannerImage} /></label>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12} className={cp.textAlignCenter}>
                        <div className={'uploadDropZoneSection'}>
                          <ImageUploadComponent
                            defaultMessage={formatMessage(messages.photosPlaceholder)}
                            componentConfig={{
                              iconFiletypes: ['.jpg', '.png', '.jpeg'],
                              multiple: false,
                              showFiletypeIcon: false,
                              postUrl: '/uploadHomeBanner'
                            }}
                            loaderName={'homeLogoUploaderLoading'}
                            success={this.success}
                          >
                          </ImageUploadComponent>
                          <img src={PictureImage} alt={'PictureImage'} className={'uploadDropZoneSectionImage'} />
                        </div>
                        <Loader
                          show={bannerUploaderLoading}
                          type={"page"}
                        >
                          {
                            image != null && <div
                              style={{ backgroundImage: `url(/images/home/${image})` }}
                              className={s.bannerImageBg}
                            />
                          }
                        </Loader>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.titleAdminLabel} /></label>
                        <AdminTranslateButton identifier="caption.title" />
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field name="title" type="text" inputClass={cx(cp.formControlInput)} component={CommonFormComponent} />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.space3}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} >
                        <label className={cp.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                        <AdminTranslateButton identifier="caption.content" label={messages.contentLabel.defaultMessage} />
                        
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={12}>
                        <Field name="content" component={CommonFormComponent} componentClass={'textarea'} />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup className={s.noMargin}>
                    <Row>
                      <Col xs={12} sm={12} md={12} lg={12} className={cx(cp.textAlignRight, 'textAlignLeftRTL')}>
                        <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit" disabled={submitting} >
                          <FormattedMessage {...messages.save} />
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

BannerSettingsForm = reduxForm({
  form: 'BannerSettingsForm', // a unique name for this form
  validate
})(BannerSettingsForm);

const mapState = (state) => ({
  bannerUploaderLoading: state.siteSettings.bannerUploaderLoading
});

const mapDispatch = {
  doUploadHomeBanner,
  startBannerUploaderLoader,
  stopBannerUploaderLoader
};

export default compose(
  injectIntl,
  withStyles(s, cp),
  connect(mapState, mapDispatch)
)(BannerSettingsForm);