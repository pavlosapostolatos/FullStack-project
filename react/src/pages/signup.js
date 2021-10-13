import React, { useState, Component } from "react";
// import Async, { useAsync } from "react-async";
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { useHistory } from "react-router-dom";

// import { Redirect } from "react-router-dom";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class SignUp extends Component {
  state = {
    email: null,
    name: null,
    interests: null,
    professional_position: null,
    company: null,
    admin: false,
    password: null,
    fields: ["email", "password", "name", "professional_position", "company"],
    data: null,
    image:null,
    errormessage: "",
  };
  
  imageHandler = (event) => {
    console.log(event.target.files[0].name)

    this.setState({
      image : 'uploads/' + event.target.files[0].name ,
    });
  
  
    }


  getUser = () => {
    var st = "http://localhost:4000/user" + "?email=" + this.state.email;
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
    if (nam === "interests") {
      val = val.replace(/\s+/g, " ").trim();
    }
    if (nam === "admin") {
      val = !this.state.admin;
    }
    // this.setState({errormessage: err});
    this.setState({ [nam]: val });
  };


  mySubmitHandler = async (event) => {
    event.preventDefault();
    console.log(this.state);
    await this.getUser();
    console.log(this.state.data);
    //checking if user already exists
    if (this.state.data.length) {
      let err = <strong>user with this email already exists</strong>;
      this.setState({ errormessage: err });
      return;
    } else {
      //adding user in db
      const {email,name,interests,professional_position,company,admin,password,image} = this.state;
      var st =
        "http://localhost:4000/user/signup" +"?email=" +email +"&name=" + name +"&interests=" +interests + "&professional_position=" +
        professional_position +"&company=" +company +"&admin=" +admin +"&password=" +password +"&image=" +this.state.image ;
      fetch(st).catch((err) => {console.error(err);if (err) return;});
      await this.getUser();
      // await sleep(1000);
      this.props.onLog(this.state.data[0]);
      // this.props.router.push('/')
    }
    // }}</Async>


    
  };
  render() {
    return (
      <>
      <div>
        <form>
          {this.state.fields.map((field) => (
            <div>
              <p>Enter your {field}:</p>
              <input type="text" name={field} onChange={this.myChangeHandler} />
            </div>
          ))}
          <p>Enter your interests without punctuations (,.) :</p>
          <input
            type="textarea"
            name="interests"
            onChange={this.myChangeHandler}
          />
          <br />
          <input
            type="checkbox"
            name="admin"
            value="admin"
            checked={this.state.admin}
            onChange={this.myChangeHandler}
          />
          <small>Admin</small>
          <br />
          <button onClick={this.mySubmitHandler}> Submit</button>
        </form>
        {this.state.errormessage}
      </div>
      <div>Chose your profile image !</div>
      <input type="file" name="image" accept="image/*" multiple={false} onChange={this.imageHandler} />
      </>
    );
  }
}

export default SignUp;
