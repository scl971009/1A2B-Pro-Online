import React, { Component } from 'react';
import Donut from 'react-svg-donuts';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	win_p: 0,
    	lose_p: 0,
      win_e: 0,
      lose_e: 0,
      name: "",
      score: 0
    };
  }
  
  getpwd = (useraccount) => {

    fetch('/get_score/'+String(useraccount)).then(res => res.json()).then(data => {
      console.log(data);
      this.setState({
	      win_p: data.win_p,
	      lose_p: data.lose_p,
        win_e: data.win_e,
        lose_e: data.lose_e,
        name: data.name,
        score: data.score
	    });
    });
  }

  componentDidMount() {
    let useraccount = localStorage.useraccount ? localStorage.useraccount:null;
    if(useraccount){
      this.getpwd(useraccount);
    }
  }
      
  render() {
    const progress_p = 100 - this.state.win_p / (this.state.win_p + this.state.lose_p)*100;
    const progress_e = 100 - this.state.win_e / (this.state.win_e + this.state.lose_e)*100;
    const renderProgress_p = progress => <strong>{this.state.win_p}W-{this.state.lose_p}L</strong>;
    const renderProgress_e = progress => <strong>{this.state.win_e}W-{this.state.lose_e}L</strong>;
    return (

        <div>
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
                <h1 className="h1 mb-3 font-weight-normal">Your Record<br></br><br></br></h1>
                <div className="form-group">
                  <label htmlFor="PW">Name</label>
                  <input style = {{color:"black"}} disabled value={this.state.name}/>
                </div>
                <div className="form-group">
                  <label htmlFor="PL">Score</label>
                  <input style = {{color:"black"}} disabled value={this.state.score}/>
                </div>
                {/* <button
                  className="btn btn-lg btn-primary btn-block"
                  onClick="javascript:location.href='/Home'"
                >
                  Back
                </button> */}
                <p>PVP</p>
                <Donut progress={progress_p} onRender={renderProgress_p} />
                <p>PVE</p>
                <Donut progress={progress_e} onRender={renderProgress_e} />
            </div>
          </div>
        </div>
    


    );
  }
}
  
  


export default Profile;
