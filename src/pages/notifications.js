import React, { Component } from "react";


class Notifications extends Component {
	state = {
        requests : [],
        notifications:[]
    };
    // constructor(props){
    componentDidMount(){
        // super(props);
        this.get_requests();
		this.get_notifications();
        //   this.handleLike= this.handleLike.bind(this);
    }
    //geting from database all requests
    get_requests = () =>{
        var st = "http://localhost:4000/requests" + "?user_id=" + this.props.user.id;
        fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  this.setState({requests : data}))
        .catch((err) => console.error(err));
    }

	get_notifications = () =>{
        var st = "http://localhost:4000/notifications" + "?user_id=" + this.props.user.id;
        fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  this.setState({notifications : data}))
        .catch((err) => console.error(err));
    }

	acceptRequest = (id) =>{
		var st = "http://localhost:4000/requests/accept" + "?req_id=" + id;
		fetch(st).catch((err) => console.error(err));
		this.get_requests();
    }
	deleteRequest = (id) =>{
		var st = "http://localhost:4000/requests/delete" + "?req_id=" + id;
		fetch(st).catch((err) => console.error(err));
		this.get_requests();
    }
    
    render(){
    return (
        <>
		<div>
			<h1>Your Friend Requests:</h1>
			{this.state.requests.map((request) => (
				<div>
					<p>{request.name}</p>
					<button onClick={() => this.acceptRequest(request.req_id)}> YES</button>
					<button onClick={() => this.deleteRequest(request.req_id)}> NO</button>
				</div>
			))}
		</div>
			<div>---------------------------------------</div>
		<div>
			<h1>Your Notifications:</h1>
			{this.state.notifications.map((notification) => (
				<div>
					<p>{notification.notify}</p>
				</div>
			))}
		</div>
        </>
    )
    }
}


export default Notifications;
