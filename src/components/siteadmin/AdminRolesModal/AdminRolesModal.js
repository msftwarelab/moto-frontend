// General
import React, { Component } from 'react';
// Redux
import {
  Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { closeAdminRolesModal } from '../../../actions/siteadmin/modalActions';
import s from './AdminRolesModal.css';
// Component
import AdminRolesForm from '../AdminRolesForm';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';
class AdminRolesModal extends Component {
  static defaultProps = {
    adminRolesModalType: 'add'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { closeAdminRolesModal, adminRolesModal, adminRolesModalType, paginationData } = this.props;

    return (
      <div>
        <Modal show={adminRolesModal} onHide={closeAdminRolesModal} className={'adminModal adminRole'}>
          <Modal.Header closeButton>
            <Modal.Title> <FormattedMessage {...messages.adminRoleLabel} /></Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={cx(s.modalRoot, s.modalBorderBottom)}>
              <AdminRolesForm paginationData={paginationData} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}


const mapState = (state) => ({
  adminRolesModal: state.adminModalStatus.adminRolesModal,
  adminRolesModalType: state.adminModalStatus.adminRolesModalType
});

const mapDispatch = {
  closeAdminRolesModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdminRolesModal)));