import React, { Component } from 'react';
import {
Nav,
NavLink,
NavMenu
} from './NavbarElements';
 import queryString from 'query-string';
 import { withRouter } from 'react-router-dom';
 import User  from './user';

 import { Link } from "react-router-dom";

 import Message from './Message';


const qs = require("qs");

class Onechat extends Component {


    state = { user:null,user2:null,isFriend :null,requested :null  }

    getUser = () => {
        var st = "http://localhost:4000/user" + "?email=" +queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).email;
        return fetch(st)
          .then((response) => response.json())
          .then(({ data }) => this.setState({ user : data[0] }))
          .catch((err) => console.error(err));
    };
    checkFriendship = () => {
        if (this.props.user == null){
            alert('please login');return;
        }
        var st = "http://localhost:4000/friends" + "?user_id=" + this.props.user.id;
        fetch(st)
        .then((response) => response.json())
        .then(({ data }) => {
            var friendlist = data.map(function(data) { return data.receiver; });
            this.setState({ isFriend : friendlist.includes(this.state.user.id) })
    
        })
        .catch((err) => console.error(err));
        var st = "http://localhost:4000/requests" + "?user_id=" + this.props.user.id;
        fetch(st)
        .then((response) => response.json())
        .then(({ data }) => {
            var reqlist = data.map(function(data) { return data.id; });
            if (reqlist.includes(this.state.user.id)) this.setState({ requested : true });
    
        })
        .catch((err) => console.error(err));
        var st = "http://localhost:4000/requests" + "?user_id=" + this.state.user.id;
        fetch(st)
        .then((response) => response.json())
        .then(({ data }) => {
            var reqlist = data.map(function(data) { return data.id; });
            if (reqlist.includes(this.props.user.id)) this.setState({ requested : true });
    
        })
        .catch((err) => console.error(err));
    };
    addFriend = () => {
        if (this.props.user == null){
            alert('please login');return;
        }
        var st = "http://localhost:4000/requests/add" + "?sender_id=" + this.props.user.id + "&receiver_id=" + this.state.user.id;
        fetch(st).catch((err) => {console.error(err);if (err) return;});
        this.setState({ requested : true });
        return;
    };
    unFriend = () => {
        if (this.props.user == null){
            alert('please login');return;
        }
        var st = "http://localhost:4000/unfriend" + "?sender_id=" + this.props.user.id + "&receiver_id=" + this.state.user.id;
        fetch(st).catch((err) => console.error(err));
        var st = "http://localhost:4000/unfriend" + "?sender_id=" + this.state.user.id + "&receiver_id=" + this.props.user.id;
        fetch(st).catch((err) => {console.error(err);if (err) return;});//twice cause we dont dont know who sent it and who received the request
        this.setState({ requested : false, isFriend :false });
        return;
    };

    message = () => {
        if (this.props.user == null){
            alert('please login');return;
        }
        return;
    };

    async componentDidMount() {
        this.getUser();

        console.log(this.props.user);

        //this.setState({ user2 : this.state.user.id });
 
      }

    render() {
       // console.log(this.state.user.id);
       //console.log(this.props.user.id)
        return ( 
        <div>
            
              <Message messeges={this.state} user={this.props.user} />
              
            </div>
 );
    }
}
 
export default withRouter(Onechat);