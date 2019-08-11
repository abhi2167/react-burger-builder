import React, {Component} from 'react';
import Modal from "../../components/UI/Modal/Modal";
import Wrapper from "../wrapper";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount () {
            console.log('calling axios will unmount')
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        dismissErrorHandler = () => {
            this.setState({
                error: null
            });
        }
        render() {
            return (
                <Wrapper>
                    <Modal show={this.state.error}
                    closeModal = {this.dismissErrorHandler}>
                        {this.state.error? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Wrapper>
            );
        }
    };
}

export default withErrorHandler;