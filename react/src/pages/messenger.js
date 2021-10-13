import React, { Component } from "react";
import MessageList from '../components/MessageList';
import '../components/Message.css'

import { Link } from "react-router-dom";
import {
  Nav,
  NavLink,
  NavMenu,
} from '../components/NavbarElements';


class Messenger extends Component {

  state = {
    messeges: [],
    dms: [],
    search : "",
    friends : [],
    searches : []
  };



  //this function create a view(in back end) of all dms that the loged-in user 
  get_dms= e => {

    var st = "http://localhost:4000/get_user_chat?usr=" + this.props.user.id ;
    fetch(st)
      .catch((err) => console.error(err));
      console.log("IN GET_DMS");

      this.select_dms();
  }
 

  //this function stores in state all users messages
  select_dms= e => {
    fetch("http://localhost:4000/select_chat")
      .then((response) => response.json())
      .then(response => this.setState({ messeges : response.data}))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.get_dms();

  }



//This function finds all users who chat with loged-in user
//and store their names in state
  get_searches = () =>{
    if(this.state.search === ""){
      this.setState({searches : [] });
      return new Promise((resolve) => setTimeout(resolve, 1));
    }
    var st = "http://localhost:4000/search" + "?name=" + this.state.search;
    return fetch(st)
    .then((response) => response.json())
    .then(({ data }) =>  this.setState({searches : data}))
    .catch((err) => console.error(err));
}

myChangeHandler =  (event) => {
  let val = event.target.value;
  this.setState({ search: val });
  console.log(this.state.search);
  this.get_searches();
  // console.log(this.state.search);
};

getLink (friend) { return ("/users?email=" + friend.email); }


  render() {

    return (
      <div>
        <div>Search Bar:</div>
         <input type="text" name="search" onChange={this.myChangeHandler} />
    <div>
  {this.state.searches.map((search) => (
    <div>
      	<NavMenu><NavLink to = {this.getLink(search)} activeStyle> {search.name}</NavLink></NavMenu>
    </div>
  ))}
</div>

         <div ><MessageList messageList={this.state.messeges} user={this.props.user} /></div>

      </div>
    );
  }
}

export default Messenger;
