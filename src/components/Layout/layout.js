import React,{Component} from "react";
import Wrapper from "../../hoc/wrapper";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState, props) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    }

    render() {
        return (
            <Wrapper>
                <Toolbar sideDrawerToggleHandler={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer}
                    closeHandler={this.closeSideDrawerHandler}/>
                <main className = {classes['main-content']}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

export default Layout;