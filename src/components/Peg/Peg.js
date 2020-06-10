import React from 'react';
import { connect } from 'react-redux';
import PegStyle from './pegStyle';
import PegNumber from './pegNumber';
import { placePeg } from '../../actions';

class Peg extends React.Component {
  handlePegClick = () => {
    const {
      colour,
      placePeg,
      clickable,
    } = this.props;
    if (!clickable) return;
    placePeg(colour);
  }

  render() {
    const {
      colour,
      result = false,
      clickable = false,
    } = this.props;
    const type = result ? 'small-circle' : 'circle';
  return <PegStyle type={type} colour={colour} clickable={clickable} onClick={this.handlePegClick}><PegNumber>{colour}</PegNumber></PegStyle>
  }
};

const mapStateToProps = (state /*, ownProps*/) => {
  return state;
}

export default connect(
  mapStateToProps,
  { placePeg }
)(Peg);