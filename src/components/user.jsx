import React, { Component } from "react";
class User extends Component {
    state = { 
        image : '',
        // id ,
        // email :,
        // name :,
        // interests :,
        // professional_position :,
        // company :,
        // admin :
        settings : null
    }

    componentDidMount(){
        this.fun();
        // {get privacy of user}
        var st = "http://localhost:4000/privacy" + "?user_id=" +this.props.user.id;
        fetch(st)
          .then((response) => response.json())
          .then(({ data }) =>  {if(data.length) { this.setState({settings : data[0]}); } })
          .catch((err) => console.error(err));
    }
    get_interests= () =>{
        return (this.props.user.interests.split(" ")).map((interest) => (
            <p>{interest}</p>
            ));
    }


    fun = (event) => 
    {
  
      fetch('http://localhost:4000/api/image' + "?id=" + this.props.user.id , {
        method: 'GET',
        headers: {
          "Content-Type" : 'application/json, charset=UTF-8',
          'Accept': 'application/json, text/html',
        },
        credentials: 'include',
      })
      .then(data => data.json())
      .then((data) => {
        console.log("data:")
       console.log(data)

       this.setState({
        image : '' ,
      });
  
        this.setState({
          image : 'http://localhost:4000/' + data.image ,
        });
        console.log(this.image)
      });
  
      
    }

    render() { 
        return ( 
            <div>
                <img class = "pic" src={this.state.image} alt="img" width="230" height="230" />
{/* print the info that is public */}
                <h1>{this.props.user.name}</h1>
                {!this.state.settings || this.state.settings.email===1 ? <small>{this.props.user.email}</small>  : <p> private email</p>}
                {!this.state.settings || this.state.settings.interests===1 ? this.get_interests() : <p> private interests</p>}
                {!this.state.settings || this.state.settings.professional_position===1 ? <p>{this.props.user.professional_position}</p>  : <p> private professional_position</p>}
                {!this.state.settings || this.state.settings.company===1 ? <p>{this.props.user.company}</p>  : <p>private company</p>}
            </div>
         );
    }
}
 
export default User;