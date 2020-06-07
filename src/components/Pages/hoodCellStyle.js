import styled from 'styled-components';

export default styled.td`
  ${props => {
    if (props.gameEnded) {
      return `
        background-color: #666;
        width: 1.71em;
        height: 2.17em;
        padding: 4px 1px 1px 1px;
        line-height: initial;
        position: relative;
        &:before {
          content:"?";
          background-color: #333;
          width: 1.71em;
          height: 2.27em;
          position: absolute;
          z-index: 3;
          top: 0;
          padding: 13px 5px;
          text-align: center;
          animation-name: fadeOut;
          animation-duration: 4s;
          opacity: 0;
          margin: -2px 0 0 -1px;
        }
      `;
    }
    return '';
  }}
`;