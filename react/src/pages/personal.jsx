import './picture.css'
import React, { Component }  from "react";
class PersonalData extends Component {
    state = {
        image :'',
        interests : this.props.user.interests,
        professional_position : this.props.user.professional_position,
        company : this.props.user.company,
        fields: ["interests", "professional_position", "company"],
        privacy :{ email : 1,professional_position : 1,company : 1,interests : 1, }
      }

    //updating user's info
    mySubmitHandler = async (event) => {
        var st= "http://localhost:4000/user/update" +"?email=" + this.props.user.email +"&name=" + this.props.user.name +"&interests=" + this.state.interests + "&professional_position=" +
        this.state.professional_position +"&company=" +this.state.company +"&password=" +this.props.user.password + "&id=" +this.props.user.id;
        console.log(st);
        fetch(st).catch((err) => {console.error(err);if (err) return;});
        this.props.refresh();
        // this.props.router.push('/')
    };
    
    //geting user's privacy setings 
    getPrivacy = () => {
      var st= "http://localhost:4000/privacy" + "?user_id=" +this.props.user.id;
      return fetch(st)
      .then((response) => response.json())
      .then(({ data }) => this.setState({ privacy: data }))
      .catch((err) => console.error(err));
    };

    //updating user's privacy setings 
    myChangeHandler = (event,field) => {
      console.log(field);
      let nam = event.target.name;console.log(nam);
      let val = event.target.value;
      var privacy=this.state.privacy;
      privacy[field]=!privacy[field];
      this.setState({ privacy });
      var st="http://localhost:4000/privacy/update" + "?user_id=" +this.props.user.id+"&field=" + field +"&value=" + privacy[field] ;
      fetch(st).catch((err) => console.error(err));
    };



    //this function is responsible for image upload
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
    
    async componentDidMount() {
      this.fun();
      await this.getPrivacy();
      if(!this.state.privacy.length){//create an entry in the privacy settings table if it doesnt exist i.e this is the first time the user enters this page
        var st= "http://localhost:4000/privacy/initialise" + "?user_id=" +this.props.user.id;
        fetch(st).catch((err) => console.error(err));
        this.setState({ privacy : { email : 1,professional_position : 1,company : 1,interests : 1, }})
      }
      else{
        this.setState({ privacy : this.state.privacy[0] })
      }







    }
    render() { 
      if (typeof this.state.privacy.email !== 'undefined')
      return ( 
        <div>
            <div class = "container">
            <div> <img class = "pic" src={this.state.image} alt="img" width="230" height="230" /></div>

          
            <form>
            {this.state.fields.map((field) => (
              <div>
                <p>Change your {field}:</p>
                <input type="text" name={field} value={this.state[field]} onChange={(e) => {this.setState({[field]: e.target.value })}}/>
              </div>
            ))}
            </form>
            <br></br>
            {Object.keys(this.state.privacy).map((field) => ( field!=='user_id' ?//irrelevant but returned in the sql query
              <div>
                <p>Public {field}:</p>
                <input
                type="checkbox"
                name={field}
                value={field}
                checked={this.state.privacy[field]}
                onChange={(event)=> this.myChangeHandler(event,field)}/* for each field render a checkbox and update the coresponding column in the mysql table when pressed(myChangeHandler) */
              />
              
              </div>
              
              :""
            ))}
            <button onClick={()=> this.mySubmitHandler()}> Submit</button>
            </div></div>

            
         );
            else return(null);
    }
}
 
export default PersonalData;