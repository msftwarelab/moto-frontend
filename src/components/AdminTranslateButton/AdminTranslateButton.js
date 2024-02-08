import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from "react";
import { compose } from 'react-apollo';
import { connect } from "react-redux";
import { openAdminTranslateModal } from '../../actions/modalActions';
import s from "./AdminTranslateButton.css";
import cx from 'classnames';
import cs from '../../components/commonStyle.css'
import languageIcon from '/public/AdminIcons/languageIcon.svg'


class AdminTranslateButton extends React.Component {

    render() {
        const { openAdminTranslateModal, identifier, label, htmlEditor } = this.props;
        
        const onClick = () => {
            const type = htmlEditor ? "html" : "default"
            openAdminTranslateModal(identifier, label, type);
        }

        let children = !identifier 
            ? "Identifier not passed!"
            : <img src={languageIcon} />


        return <span
            data-translation-key={identifier}
            type='button'
            className={cx(cs.marginRight8, cs.marginLeft8, "marginRight8", "marginRight8RTL", "siteAdminHeaderLink")}
            style={{
                cursor: "pointer"
            }}

            onClick={onClick}
        >{children}</span>
    }
}

const mapDispatch = {
    openAdminTranslateModal
}

export default compose(
    withStyles(s),
    connect(null, mapDispatch),
)(AdminTranslateButton)