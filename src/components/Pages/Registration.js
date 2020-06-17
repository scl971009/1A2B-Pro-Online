import React, {Component} from "react";
import { register } from './UserFunctions'
export default class Registration extends Component {
    constructor(){
        super();

        this.state = {
            account: "",
            password: "",
            password_confirmation: "",
            name: "",
            registrationErrors: ""
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    onSubmit(event){
        const { account, password, password_confirmation, name} = this.state;
        event.preventDefault();
        const newUser = {
            account: account,
            password: password,
            password_confirmation: password_confirmation,
            name: name
        }

        register(newUser).then(
            res =>{
                if (res === 0)
                    this.props.history.push('/login')
            }
        )
        /*
        const { account, password, password_confirmation, name} = this.state;

        if (password !== password_confirmation){
            alert("Fuck you");
        }
        else{
            axios.get('/sign_up/'.concat(email, '/', password, '/', name),
            { withCredentials: true })
            .then(response => {
                //successful
                if(response.data.result === 0){
                    this.props.handleSuccessfulAuth(response.data)
                }
                //error
                else if (response.data.result === -1){
                    console.log("fuck you error");
                }
                //duplicate
                else if (response.data.result === 1){
                    console.log("fuck duplicate");
                }
            })
            .catch(error => {
                console.log("registration error", error);
            });
        }

        */
        
    }
    render(){
        return (
            <div className="container">
            <div className="row">
              <div className="col-md-6 mt-5 mx-auto">
                <form noValidate onSubmit={this.onSubmit}>
                  <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                  <div className="form-group">
                    <label htmlFor="email">Account</label>
                    <input
                      type="email"
                      className="form-control"
                      name="account"
                      placeholder="Enter your email address"
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
                      placeholder="Enter your password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password Comfirmation</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password_confirmation"
                      placeholder="Comfirm your password"
                      value={this.state.password_confirmation}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="name"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                  >
                    Register!
                  </button>
                </form>
              </div>
            </div>
            </div>
            
            
        )
    }
}
