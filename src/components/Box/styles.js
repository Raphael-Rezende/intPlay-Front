import styled from "styled-components";

export const DialogStyle = styled.div`
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
    background-Color: ${props => props.backgroundColor ? props.backgroundColor : "#111"};
    padding: 10px 20px 40px;
    border-Radius: 8px;
    display: flex;
    flex-Direction: column;
`;
export const DialogClose = styled.button`
    margin-Bottom: 15px;
    padding: 3px 8px;
    border-Radius: 50%;
    color: ${props => props.color ? props.color : "#000"};
    border: none;
    width: 30px;
    height: 30px;
    font-weight: bold;
    align-self: flex-end;
`;
export const Title = styled.h6`
  color: ${props => props.color ? props.color : "#000"};
  font-size: ${props => props.fontSize ? props.fontSize : 17 + 'px'};
  margin: 1em;
`;