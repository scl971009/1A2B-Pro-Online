import styled from 'styled-components';

export default styled.div`
  height: ${props => (props.type === 'small-circle' ? '0.7em' : '1.5em')};
  width: ${props => (props.type === 'small-circle' ? '0.7em' : '1.5em')};
  border-radius: 50%;
  display: inline-block;
  box-shadow: #000 0px 1px 2px;
  position: relative;
  border: ${props => (props.type === 'small-circle' && 'solid 1px black')};
  margin: ${props => (props.type === 'small-circle' && '0 1px')};
  &:before {
    content: "";
    position: absolute;
    top: 4%;
    left: 4%;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 0px, #ffffff, rgba(255, 255, 255, 0) 58%);
    filter: blur(1.5px);
    opacity: 0.4;
    z-index: 2;
  }
  cursor: ${props => (props.clickable && 'pointer')};
  margin: ${props => (props.clickable && '1px 2px')};
  background: ${props => {
    switch(props.colour) {
      case '1':
        return props.type === 'small-circle' ? 'radial-gradient(circle at 3px 3px, #f00, #652222)' : 'radial-gradient(circle at 8px 6px, #f00, #632222)'
      case '2':
        return 'radial-gradient(circle at 8px 6px, #0f0, #083e08)'
      case '3':
        return 'radial-gradient(circle at 8px 6px, #00f, #040425)'
      case '4':
        return 'radial-gradient(circle at 8px 6px, #ff0, #42420f)'
      case '5':
        return 'radial-gradient(circle at 8px 6px, #a03d3d, #2b0505)'
      case '6':
        return 'radial-gradient(circle at 8px 6px, #ffa500, #48330f)'
      case '7':
        return 'radial-gradient(circle at 8px 6px, #FFDDAA, #FFAA33)'
      case '8':
        return 'radial-gradient(circle at 8px 6px, #AAFFEE , #33FFDD)'
      case '9':
        return 'radial-gradient(circle at 8px 6px, #CCBBFF, #7744FF)'
      case '0':
        return props.type === 'small-circle' ? 'radial-gradient(circle at 3px 1px, #fff, #868686)' : 'radial-gradient(circle at 8px 6px, #fff, #868686)'
      default:
        return 'radial-gradient(circle at 8px 6px, #f00, #632222)';
    }
  }};
`;
