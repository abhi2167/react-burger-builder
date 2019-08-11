import React, {Component} from "react";
import classes from "./Modal.css";
import Wrapper from "../../../hoc/wrapper";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('Modal.js Willupdate...');
    }

    render() {
        return (
            <Wrapper>
                <Backdrop show = {this.props.show} clickHandler = {this.props.closeModal} />
                <div className = {classes.Modal} style = {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}

export default Modal;