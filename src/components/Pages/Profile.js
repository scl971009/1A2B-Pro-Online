import React, {Component} from 'react';
import { login } from './UserFunctions'

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        win_p : '',
        lose_p : '',
        win_e : '',
        lose_e : ''
      };
    }
    render() {
      let useracount = localStorage.useracount ? localStorage.useracount:null;
      if(useracount){
        fetch('/get_score/'+String(useracount)).then(res => res.json()).then(data =>{
          this.setState({
            win_p : data.win_p,
            lose_p : data.lose_p,
            win_e : data.win_e,
            lose_e : data.lose_e
          });
        });
      }
        return (
            <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
              <h1 className="h1 mb-3 font-weight-normal">Your Record<br></br><br></br></h1>
              <div className="form-group">
                <label htmlFor="PW">PVE Win</label>
                <input disabled value={this.state.win_p}/>
              </div>
              <div className="form-group">
                <label htmlFor="PL">PVE Loss</label>
                <input disabled value={this.state.lose_p}/>
              </div>
              <div className="form-group">
                <label htmlFor="EW">PVP Win</label>
                <input disabled value={this.state.win_e}/>
              </div>
              <div className="form-group">
                <label htmlFor="EL">PVP Loss</label>
                <input disabled value={this.state.lose_e}/><br></br><br></br>
              </div>
              {/* <button
                className="btn btn-lg btn-primary btn-block"
                onClick="javascript:location.href='/Home'"
              >
                Back
              </button> */}
          </div>
        </div>
        </div>

        )
    }

}

export default Profile;
