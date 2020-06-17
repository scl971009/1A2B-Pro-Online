import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
      super()
      this.state = {
        account: '',
        name: '',
        errors: {}
      }
    }
  
    componentDidMount() {
      const user = JSON.parse(localStorage.getItem('usertoken'))
      console.log('user', user)
      this.setState({
        account: user.account,
        name: user.name
      })
    }
  
    render() {
      return (
        <div className="container">
          <div className="jumbotron mt-5">
            <div className="col-sm-8 mx-auto">
              <h1 className="text-center">PROFILE</h1>
            </div>
            <table className="table col-md-6 mx-auto">
              <tbody>
                <tr>
                  <td>Account</td>
                  <td>{this.state.account}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{this.state.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  }
  
  export default Profile