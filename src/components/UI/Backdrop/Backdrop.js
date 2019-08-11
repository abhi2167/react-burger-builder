import React from "react";
import classes from "./Backdrop.css"

const backDrop = (props) => {
    return (
        props.show ? <div className = {classes.Backdrop}
        onClick = {props.clickHandler} ></div> : null
    );
}

export default backDrop;