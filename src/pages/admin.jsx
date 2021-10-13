import React, { Component } from "react";
import exportFromJSON from "export-from-json";

class AdminPage extends Component {
  state = {
    allUsers : [],
    selected : []
  };
  //Storing in state all users
  get_Users= e => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then(response => this.setState({ allUsers : response.data}))
      .catch((err) => console.error(err));
  }
  //This function expors users data in any given type
  export = (type) =>{
    const fileName = 'download'+type;  
    const exportType = type ; 
    const data=this.state.allUsers.filter( user => this.state.selected.includes(user.id));
    console.log(data);
    exportFromJSON({ data, fileName, exportType });
    return;
  }

  myChangeHandler = (event,user) => {
    console.log(user);
    let nam = event.target.name;
    let val = event.target.value;
    var selected=this.state.selected;
    if(selected.includes(user.id)){//remove him if he is in the checked list
        const index = selected.indexOf(user.id);
        if (index > -1) 
        selected.splice(index, 1);
    }
    else
        selected.push(user.id);
    this.setState ({selected});
  };

  componentDidMount() {
    this.get_Users();
  }
  render() {
    return (
        <div>
        <button onClick={ ()=>{ this.setState({selected : this.state.allUsers.map(function(allUsers) { return allUsers.id; }) }) } }> SELECT ALL</button> 
        <button onClick={ ()=>{ this.setState({selected : [] }) } }> UNSELECT ALL</button> 
        <button onClick={()=> this.export("json")}> JSON</button>
        <button onClick={()=> this.export("xml")}> XML</button> <br></br>
        {this.state.allUsers.map((user) => (
        <div>
          <p>{user.name}:</p>
          <input
          type="checkbox"
          name={user.name}
          value={this.state.selected.includes(user.id)}
          checked={this.state.selected.includes(user.id)}
          onChange={(event)=> this.myChangeHandler(event,user)}
        />
        </div>
        ))}
        </div>
    )};
}

export default AdminPage;
