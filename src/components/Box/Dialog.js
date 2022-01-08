import React, { Component } from 'react';

import { DialogStyle, DialogClose, Title } from './styles'


class Dialog extends Component {
  render() {
    let dialog = (
      <DialogStyle backgroundColor={this.props.backgroundColor}>
        {this.props.onClose ? (<DialogClose onClick={this.props.onClose}>x</DialogClose>) : null}
        <div>{this.props.children}</div>
      </DialogStyle>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return (
      <div>
        {dialog}
      </div>
    );
  }
}

export default Dialog;