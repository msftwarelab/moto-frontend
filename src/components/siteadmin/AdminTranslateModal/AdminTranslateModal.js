import cx from "classnames";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from "react";
import {
    Button,
    FormGroup,
    Modal
} from 'react-bootstrap';
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { closeAdminTranslateModal } from "../../../actions/modalActions";
import cp from '../../../components/commonStyle.css';
import messages from '../../../locale/messages';
import s from './AdminTranslateModal.css';
import { graphql, compose, gql } from 'react-apollo';
import { Field, reduxForm, formValueSelector, initialize, destroy } from 'redux-form';
import CommonFormComponent from '../../CommonField/CommonFormComponent';
import fetch from '../../../core/fetch';
import { toastr } from 'react-redux-toastr';

class AdminTranslateModal extends React.Component {
    constructor() {
        super();
        if (typeof window !== 'undefined') {
            this.ReactQuill = require('react-quill')
        }
    }

    async handleSubmit(values) {

        const identifier = this.props.identifier;
        console.debug(`Translatation:handleSubmit`, values);
        

        const query = `
            mutation (
                $translations: [TranslationInput!]!,
            ) {
                updateTranslations (
                    translations: $translations
                ) {
                    status
                }
            }
        `;

        const translations = Object.entries(values)
            .map(([id, value]) => ({ id: `${identifier}.${id}`, value }))

        
        const resp = await fetch('/graphql', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables: {
                    translations
                }
            }),
            credentials: 'include',
        });

        const { data } = await resp.json();
        console.debug(`Translation:response`, data);
        if (data.updateTranslations.status === "success") {
            toastr.success("Translation update", "Changes are updated!");
            this.props.closeAdminTranslateModal();
        } else {
            console.error(data.updateTranslations.status)
            toastr.error("Translation update", "Updating failed");
        }
        this.props.destroy();
    }

    componentDidUpdate(prevProps) {
        const prevHash = this._calculateGetTranslationsDataHash(prevProps.getTranslationsData, prevProps);
        const curHash = this._calculateGetTranslationsDataHash(this.props.getTranslationsData, this.props);

        const isShouldUpdate = prevHash != curHash
        
        console.debug("AdminTranslateModal:debug:initialize", {
            prevHash,
            curHash,
            isShouldUpdate
        })

        if (isShouldUpdate) {
            const values = this.props.getTranslationsData.getTranslations.map(item => {
                return {
                    id: item.id.split(".").slice(-1).join(""),
                    value: item.value
                }
            }).reduce((prev, current) => {
                return {
                    ...prev,
                    [current.id]: current.value
                };
            }, {});

            console.debug(`AdminTranslateModal:debug:initialize`, values);
            this.props.initialize(values);
        }
    }

    _calculateGetTranslationsDataHash(getTranslationsData, props) {
        if (!getTranslationsData || !getTranslationsData.getTranslations) return undefined;
        return getTranslationsData.getTranslations.reduce((prev, current) => {
            return `${prev}-${current.id}${getTranslationsData.loading ? "-loading" : "-done"}${props.isAdminTranslateModalOpen ? "-open" : "-close"}`;
        }, "")
    }


    renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
        const { formatMessage } = this.props.intl;
        const ReactQuill = this.ReactQuill;
        let modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link'],
                // ['link', 'image'],
            ],
            clipboard: {
                matchVisual: false,
            }
        };

        let formats = [
            'header', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link'
            // 'link', 'image'
        ];
        return (
            <div>
                <ReactQuill
                    {...input}
                    onChange={(newValue, delta, source) => {
                        if (source === 'user') {
                            input.onChange(newValue);
                        }
                    }}
                    onBlur={(range, source, quill) => {
                        if (quill.getHTML() == '<p><br></p>') {
                            input.onBlur('');
                        }
                        else {
                            input.onBlur(quill.getHTML());
                        }
                    }}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        );
    }

    render() {
        const {
            type,
            isAdminTranslateModalOpen,
            label,
            closeAdminTranslateModal,
            identifier,
            availableLocales,
            getTranslationsData,
            handleSubmit
        } = this.props;

        
        const values = getTranslationsData
            && getTranslationsData.getTranslations
            && getTranslationsData.getTranslations.reduce((prev, current) => {
                return {
                    ...prev,
                    [current.id]: current.value
                }
            }, {}) || {}

        return <div>
            <Modal show={isAdminTranslateModalOpen} onHide={() => this.props.destroy() && closeAdminTranslateModal()} className={'adminModal adminRole'}>
                <Modal.Header closeButton>
                    <Modal.Title>Admin Translate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {label && <label>Translation for: {label}</label>}
                    <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                        {values !== undefined && availableLocales.map((locale) =>
                        {
                            
                            return <FormGroup key={locale}>
                                <label>{locale}</label>

                                <Field
                                    name={locale}
                                    type="text"
                                    component={type === "default" ? CommonFormComponent : this.renderQuill}
                                    value={values[`${identifier}.${locale}`]}
                                />
                            </FormGroup>
                            }
                        )}

                        <Button className={cx(cp.btnPrimary, cp.btnlarge)} type="submit">
                            <FormattedMessage {...messages.save} />
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    }
}



AdminTranslateModal = reduxForm({
    form: "AdminTranslateModal"
})(AdminTranslateModal);
const selector = formValueSelector('AdminTranslateModal');



const mapState = (state, ownProps) => {

    return {
        isAdminTranslateModalOpen: state.modalStatus.isAdminTranslateModalOpen,
        label: state.modalStatus.label,
        identifier: state.modalStatus.identifier,
        type: state.modalStatus.type,
        availableLocales: state.runtime.availableLocales,
        id: selector(state, 'id')
    };
};


const mapDispatch = {
    closeAdminTranslateModal,
    initialize,
    destroy
}

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(gql`
        query getTranslations($ids: [String!]!) {
          getTranslations(ids: $ids) {
            id
            value
          }
        }
      `, {
        name: 'getTranslationsData',
        options: (props) => {
            const { identifier, availableLocales } = props;
            const ids = availableLocales.map((locale) => `${identifier}.${locale}`);

            return {
                ssr: true,
                variables: {
                    ids
                },
                skip: !identifier || !ids || ids.length === 0,
                fetchPolicy: "network-only"
            }
        }
    })
)(AdminTranslateModal)