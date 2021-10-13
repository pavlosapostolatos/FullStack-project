import React, { Component }  from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  NavLink,
  NavMenu,
} from '../components/NavbarElements';
class Net extends Component {
	state = {
    image : '',
    uploadStatus : '',
    search : "",
    friends : [],
    searches : []
};
// constructor(props){
async componentDidMount(){
    // super(props);
    await this.get_friends();
    // await this.get_searches();
    //   this.handleLike= this.handleLike.bind(this);
}

get_friends = () =>{
    var st = "http://localhost:4000/friends" + "?user_id=" + this.props.user.id;
    return fetch(st)
    .then((response) => response.json())
    .then(({ data }) =>  this.setState({friends : data}))
    .catch((err) => console.error(err));
}

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







render(){
return (
    <>
    <input type="text" name="search" onChange={this.myChangeHandler} />
    <div>
  {this.state.searches.map((search) => (
    <div>
      	<NavMenu><NavLink to = {this.getLink(search)} activeStyle> {search.name}</NavLink></NavMenu>
    </div>
  ))}
</div>
<div>
  <h1>Your Friends:</h1>
  {this.state.friends.map((friend) => (
    <div>
      	<NavMenu><NavLink to = {this.getLink(friend)} activeStyle> {friend.name}</NavLink></NavMenu>
    </div>
  ))}
</div>

    </>
)
}
}

export default Net;
