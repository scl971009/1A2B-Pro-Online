import React, {Component} from 'react';
import Registration from './Registration';

class Login extends Component {
    constructor(props){
        super(props);
    
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data){
        this.props.handleLogin(data);
        //Redirection
        this.props.history.push("/")
    
    }
    render() {
        return (
            <div className="container"> 
                <h1 className="py-3">Login Page</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            </div>

        )
    }

}

export default Login;