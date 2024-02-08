import React from "react";
import SidePanel from "../../components/ListPlaceStep1/SidePanel";
import s from "../../components/ListPlaceStep1/ListPlaceStep1.css";
import cs from '../../components/commonStyle.css';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { injectIntl, FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import validate from "./validate";
import update from "./update";
import { TranslationWrapper } from '../../components/Translation/Translation';
import { ControlLabel, FormGroup } from "react-bootstrap";
import messages from '../../locale/messages';
import CommonFormComponent from "../../components/CommonField/CommonFormComponent";
import FooterButton from "../../components/ListPlaceStep1/FooterButton";
import { Button } from "react-bootstrap";
import DocumentUpload from "../../components/DocumentUpload/DocumentUpload";

class VerifyOwner extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            userType: ['Individual', 'Company'],
        }
    }

    submit(nextPage) {

    }
    

    render() {
        const { handleSubmit, userType: userTypeValue } = this.props;
        const isCompany = userTypeValue === 'Company';
        const { userType } = this.state; 
        const { formatMessage } = this.props.intl;

        console.log(`STATE`, this.state, this.props);
        return (
            <div className={cx(s.stepGrid, 'stepGridRTL')}>
                <SidePanel
                    title={"Verify Owner"}
                    landingContent={"We need more information about you to get started"}
                />
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className={s.landingMainContent}>
                            <FormGroup className={s.formGroup}>
                                <ControlLabel className={s.landingLabel}>
                                    <FormattedMessage {...messages.areYouCompany} />
                                </ControlLabel>
                                <Field
                                    name="userType"
                                    component={CommonFormComponent}
                                    inputClass={cx(s.formControlSelect, s.jumboSelect, s.marginBottompageTwo)}
                                >
                                    {
                                        userType.map((value, key) => {
                                            return <option key={key} value={value}>
                                                {formatMessage(messages[`userType${value}`])}
                                            </option>
                                        })
                                    }
                                </Field>
                            </FormGroup>
                            <FormGroup className={s.formGroup}>
                                <ControlLabel className={s.landingLabel}>
                                    <FormattedMessage {...messages[isCompany ? 'fullCompanyName': 'fullName']} />
                                </ControlLabel>
                                <Field
                                    name="name"
                                    component={CommonFormComponent}
                                    inputClass={cx(s.marginBottompageTwo, cs.formControlInput)}
                                >
                                </Field>
                            </FormGroup>
                            <FormGroup className={s.formGroup}>
                                <ControlLabel className={s.landingLabel}>
                                    <FormattedMessage {...messages[isCompany ? 'fullCompanyName' : 'yourFullAddress']} />

                                </ControlLabel>
                                <Field
                                    name="address"
                                    component={CommonFormComponent}
                                    inputClass={cx(s.marginBottompageTwo, cs.formControlInput)}
                                >
                                </Field>
                            </FormGroup>
                            <FormGroup className={s.formGroup}>
                                <ControlLabel className={s.landingLabel}>
                                    <FormattedMessage {...messages.phoneNumber} />
                                </ControlLabel>
                                <Field
                                    name="phone"
                                    component={CommonFormComponent}
                                    inputClass={cx(s.marginBottompageTwo, cs.formControlInput)}
                                >
                                </Field>
                            </FormGroup>
                            <FormGroup className={s.formGroup}>
                                <ControlLabel className={s.landingLabel}>
                                    <FormattedMessage {...messages.email} />
                                </ControlLabel>
                                <Field
                                    name="email"
                                    component={CommonFormComponent}
                                    inputClass={cx(s.marginBottompageTwo, cs.formControlInput)}
                                >
                                </Field>
                            </FormGroup>
                            <FormGroup className={s.formGroup}>
                                <ControlLabel className={s.landingLabel}>
                                    <>Line</>
                                </ControlLabel>
                                <Field
                                    name="line"
                                    component={CommonFormComponent}
                                    inputClass={cx(s.marginBottompageTwo, cs.formControlInput)}
                                >
                                </Field>
                            </FormGroup>
                            <FormGroup className={s.formGroup}>
                                <ControlLabel className={s.landingLabel}>
                                    <>National id front and back side or passport</>
                                </ControlLabel>
                                <DocumentUpload mark="passport" placeholder={formatMessage(messages.documentUploadPlaceholder)} />
                            </FormGroup>
                            {userTypeValue === "Company" && <FormGroup className={s.formGroup}>
                                <ControlLabel className={s.landingLabel}>
                                    <>Upload copy of company registration document</>
                                </ControlLabel>
                                <DocumentUpload mark="company_registration" placeholder={formatMessage(messages.documentUploadPlaceholder)} />
                            </FormGroup>}

                            
                        </div>
                        <div className={cx(s.nextPosition)}>
                            <div className={cx(s.nextBackButton, 'btnSmallMb')}>
                                <Button type="submit" className={cx(s.btnPrimary)} disabled={false} onClick={() => () => {}}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                        {/* <FooterButton
                            isDisabled={false}
                            nextPage={undefined}
                            previousPage={undefined}
                            nextPagePath={"location"}
                            previousPagePath={undefined}
                            formPage={undefined}
                            step={undefined}
                        /> */}
                    </form>
                </div>
            </div>
        )
    }

}

VerifyOwner = reduxForm({
    form: 'VerifyOwner',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    onSubmit: update
})(VerifyOwner);

const selector = formValueSelector('VerifyOwner');

const mapState = (state) => ({

    userType: selector(state, 'userType'),
});

const mapDispatch = {
};



export default injectIntl(
    withStyles(s, cs)(
        connect(mapState, mapDispatch)(VerifyOwner)
    )
);
 