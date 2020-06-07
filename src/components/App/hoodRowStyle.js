import styled from 'styled-components';

export default styled.tr`
  ${props => {
    if (!props.gameEnded) {
      return `
        text-align: center;
        height: 2.13em;
      `;
    }
    return '';
  }}
`;