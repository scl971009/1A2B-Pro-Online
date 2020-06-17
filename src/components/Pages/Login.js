import React, {Component} from 'react';
import { login } from './UserFunctions'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            account: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        const user = {
            account: this.state.account,
            password: this.state.password
        }

        login(user).then(res =>{
            if(res){
                //console.log(this.props);
                localStorage.setItem("useraccount", this.state.account)
                this.props.history.push('/')
                //console.log(this.state);

            }
        })
    }
    render() {
        return (
            <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="email">Account</label>
                <input
                  type="email"
                  className="form-control"
                  name="account"
                  placeholder="Email"
                  value={this.state.account}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
        </div>

        )
    }

}

export default Login;