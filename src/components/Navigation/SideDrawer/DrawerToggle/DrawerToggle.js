import React from "react";
import classes from "./DrawerToggle.css";

const drawerToggle = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.clickHandler}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawerToggle;