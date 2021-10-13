import React from 'react';
import './App.css';
import Navbar from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import PersonalData from './pages/personal';
import Settings from './pages/settings';
import AdminPage from './pages/admin';
import Notifications from './pages/notifications';
import Net from './pages/net';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import UserPage from './components/userpage';
import { Component } from 'react';
import Onechat from './components/onechat';
import Messenger from './pages/messenger';
/*

const INSERT_POST_QUERY= `SELECT * FROM posts WHERE ( title= "pavlos" && text= "pavlos2");`
    connection.query(INSERT_POST_QUERY,(err,results) => {
        if( err)
            return res.send(err);
        else{
            console.log("sssuuuucccc");
            return res.json({
                data: results
            }) 
        }
    })


*/


class App extends Component {
	state = { signed_in: false,user : null  }
	handleLogin = user => {
		const signed_in = true;
		this.setState({ signed_in,user });//remember user
		console.log(user);
	};
	RefreshUser = () => {
		var st= "http://localhost:4000/user/id" +"?id=" + this.state.user.id;
		fetch(st)
      .then((response) => response.json())
      .then(({ data }) => this.setState({ user: data[0] }))
      .catch((err) => console.error(err));
	};
	render() { 
		if( ! (this.state.user && this.state.user.admin===1) )
		return (
			<Router>
			<Navbar user={this.state.user} logged_in= {this.state.signed_in}/>
			<Switch>
				{this.state.signed_in ? <Route path="/signin"> <Home key={1} user={this.state.user} aggelia={false} /></Route> : ""}
				{this.state.signed_in ? <Route path="/signup"> <Home key={1} user={this.state.user} aggelia={false} /></Route> : ""}
				{this.state.signed_in ? <Route exact path="/home"> <Home key={1} user={this.state.user} aggelia={false}/></Route> : ""}
				{this.state.signed_in ? <Route path="/aggelies"> <Home key={2} user={this.state.user} aggelia={true} /></Route> : ""}
				{this.state.signed_in ? <Route path="/personal"> <PersonalData user={this.state.user} refresh= {this.RefreshUser} /></Route> : ""}
				{this.state.signed_in ? <Route path="/settings"> <Settings user={this.state.user} refresh= {this.RefreshUser} /></Route> : ""}
				<Route path="/users"> <UserPage user={this.state.user} /> </Route>
				{this.state.signed_in ? <Route path="/notifications"> <Notifications user={this.state.user} /></Route> : ""}
				{/* <Route path="/notifications"> <Notifications user={this.state.user} /></Route> */}
				{this.state.signed_in ? <Route path="/net"> <Net user={this.state.user} /></Route> : ""}
				{this.state.signed_in ? <Route path="/messenger"> <Messenger user={this.state.user} /></Route> : ""}
				{this.state.signed_in ? <Route path="/onechat"> <Onechat user={this.state.user} /></Route> : ""}
				{this.state.signed_in ? "" : <Route path="/signin"> <SignIn onLog= {this.handleLogin}  /></Route>}
				{this.state.signed_in ? "" : <Route path="/signup"> <SignUp onLog= {this.handleLogin}  /></Route>}
				{/* <Route path='/signin' component={Counters} /> */}
			</Switch>
			</Router>
		);
		else
		return(
			<>
			<div class= "lg">
			<Router>
			<Navbar user={this.state.user} logged_in= {this.state.signed_in}/>
			
			<Switch>

				{this.state.signed_in ? <Route path="/signin"> <AdminPage user={this.state.user} /></Route> : ""}
				{this.state.signed_in ? <Route path="/signup"> <AdminPage user={this.state.user} /></Route> : ""}
				{this.state.signed_in ? <Route exact path="/"> <AdminPage user={this.state.user} /></Route> : ""}

			</Switch>
			
			</Router>
			</div>
			</>
		);
	}
}
 
export default App;
