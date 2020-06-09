import React, {Component} from "react";

export default class Registration extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    handleSubmit(event){
        const { email, password, password_confirmation} = this.state;

        if (password !== password_confirmation){
            alert("Fuck you");
        }
        else{

        }
        event.preventDefault();
    }
    render(){
        return (<div>
            <form onSubmit = {this.handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={this.state.email} 
                    onChange={this.handleChange} 
                    required 
                />

                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    required 
                />

                <input 
                    type="password" 
                    name="password_confirmation" 
                    placeholder="password_confirmation" 
                    value={this.state.password_confirmation} 
                    onChange={this.handleChange} 
                    required 
                />

                <button type="submit">Register</button>

            </form>

        </div>
        )
    }
}