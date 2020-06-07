import React from 'react';
import { connect } from 'react-redux'
import ModalWrapperStyle from './modalWrapperStyle';
import CloseButtonStyle from './closeButtonStyle';
import ModalHeadingStyle from './modalHeadingStyle';
import { closeModal } from '../../actions'

class Modal extends React.Component {
  handleCloseClick = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  render() {
    const {
      show = false,
      title,
      content,
    } = this.props;

    if (!show) return null;

    return (
      <ModalWrapperStyle>
        <CloseButtonStyle onClick={this.handleCloseClick}>
          &times;
        </CloseButtonStyle>
        <ModalHeadingStyle>{title}</ModalHeadingStyle>
        {content}
      </ModalWrapperStyle>
    );
  }
};

const mapStateToProps = (state) => {
  return state;
}

export default connect(
  mapStateToProps,
  { closeModal }
)(Modal);