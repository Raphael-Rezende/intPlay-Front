import styled from "styled-components";
import Modal from 'react-modal';


export const ModalStyle = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px solid #ccc;
  background: #fff;
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;
`;
export const Container = styled.div`
  background-color: ${props => props.backgroundColor ? props.backgroundColor : "#111"};
  padding: 0.25em 1em;
  border-radius:10px;
`;
export const Botao = styled.button`
  background-color: ${props => props.disable ? 'gray' : (props.backgroundColor ? props.backgroundColor : "#1430f0")};
  color: ${props => props.color ? props.color : "#fff"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
`;

export const Title = styled.h6`
  color: ${props => props.color ? props.color : "#000"};
  font-size: ${props => props.fontSize ? props.fontSize : 17 + 'px'};
  margin: 1em;
`;
export const Warning = styled.img`
  border-radius : 500px;
  width: 100px;
  height: 100px;
  margin: 1em;
  
`;
export const Label = styled.label`
  color: ${props => props.color ? props.color : "#000"};
  margin-top: 15px;
  font-size: 1.2em;
  padding: ${props => props.padding ? props.padding : 5};
`;
export const Input = styled.input`

  color: ${props => props.color ? props.color : "#000"};
  margin-top: 15px;
  background: ${props => props.backgroundColor ? props.backgroundColor : "#1430f0"};
  margin-left: ${props => props.marginLeft ? props.marginLeft : 0 + "px"};
  margin-right: ${props => props.marginRight ? props.marginRight : 0 + "px"};
  border-radius: 15px;
  padding: 0.1em 1em;
`;
export const ModalCustomizad = styled.div`
  display: ${props => props.display ? 'block' : 'none'}; 
  position: relative;
  z-index: 1; 
  left: 0;
  bottom: 10%;
  width: 100%; 
  height: 100%;
  overflow: auto; 
  background-color: ${props => props.backgroundColor ? props.backgroundColor : "#111"};
`;

export const HelperText = styled.label`
  color: ${props => props.color ? props.color : "#000"};
  font-size: 0.7em;
  padding: ${props => props.padding ? props.padding : 5};
`;
export const Select = styled.select`
  width: 100%;
  height: 35px;
  background-color: #111;
  color: gray;
  padding-left: 5px;
  font-size: 17px;
  border: 2px;
  border-radius: 16px;

  option {
    color: white;
    background: #111;
    border: none;
    border-radius: 16px;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;


