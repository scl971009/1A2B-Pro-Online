import React, {Component} from 'react';
import Registration from './Registration';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="py-3">Login Page</h1>
                <Registration />
            </div>

        )
    }

}

export default Login;