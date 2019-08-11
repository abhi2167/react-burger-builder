import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Wrapper from "../../../hoc/wrapper";

const sideDrawer = (props) => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        sideDrawerClasses[1] = classes.Open;
    }
    return (
        <Wrapper>
            <Backdrop show ={props.open} clickHandler={props.closeHandler}/>
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Wrapper>
    );
}

export default sideDrawer;