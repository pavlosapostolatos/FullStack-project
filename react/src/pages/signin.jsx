import React, { useState, Component } from "react";
import {
  NavBtn,NavBtnLink,NavMenu
} from '../components/NavbarElements';
// import Async, { useAsync } from "react-async";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { useHistory } from "react-router-dom";

// import { Redirect } from "react-router-dom";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class SignIn extends Component {
  state = {
    email: null,
    password: null,
    fields: ["email", "password"],
    data: null,
    errormessage: "",
  };
  getUser = () => {
    var st = "http://localhost:4000/user/signin" + "?email=" + this.state.email+ "&password=" + this.state.password;
    return fetch(st)
      .then((response) => response.json())
      .then(({ data }) => this.setState({ data }))
      .catch((err) => console.error(err));
  };
  myChangeHandler = (event) => {
    let nam = event.target.name;
    console.log(this.state);
    let val = event.target.value;
    // let err = '';
    // this.setState({errormessage: err});
    this.setState({ [nam]: val });
  };
  mySubmitHandler = async (event) => {
    event.preventDefault();
    console.log(this.state);
    await this.getUser();
    console.log(this.state.data);
    if (!this.state.data.length) {
      let err = <strong>no user with corresponding email and passsword.check your credentials</strong>;
      this.setState({ errormessage: err });
      return;
    } else {
      // await sleep(1000);
      this.props.onLog(this.state.data[0]);
      // this.props.router.push('/')
    }
    // }}</Async>
  };
  render() {
    return (
      <div>
        <form>
          {this.state.fields.map((field) => (
            <div>
              <p>Enter your {field}:</p>
              <input type="text" name={field} onChange={this.myChangeHandler} />
            </div>
          ))}
          <br />
          <NavMenu><NavBtn><NavBtnLink to='/home' onClick={this.mySubmitHandler} > Submit</NavBtnLink></NavBtn></NavMenu>
        </form>
        {this.state.errormessage}
      </div>
    );
  }
}

export default SignIn;
