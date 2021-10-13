import React, { Component }  from "react";
import './picture.css'


class Settings extends Component {
    state = {
        image : '',
        email : this.props.user.email,
        password : this.props.user.password,
        user_id : this.props.user.id,
        fields: ["email", "password"],
        errormessage :null,
        data : null
      }
      //getting users info
      getUser = () => {
        var st = "http://localhost:4000/user" + "?email=" + this.state.email;
        return fetch(st)
          .then((response) => response.json())
          .then(({ data }) => this.setState({ data }))
          .catch((err) => console.error(err));
      };

    mySubmitHandler = async (event) => {
        await this.getUser();
        //cheking if this e-mail is available
        if (this.state.data.length) {
            let err = <strong>user with this email already exists</strong>;
            this.setState({ errormessage: err });
            return;
        }
        //updating user's info
        var st= "http://localhost:4000/user/update" +"?email=" +this.state.email +"&name=" + this.props.user.name +"&interests=" + this.props.user.interests + "&professional_position=" +
        this.props.user.professional_position +"&company=" +this.props.user.company +"&password=" +this.state.password + "&id=" +this.props.user.id;
        console.log(st);
        fetch(st).catch((err) => {console.error(err);if (err) return;});
        this.props.refresh();
        this.setState({ errormessage: null });
        // this.props.router.push('/')
    };



    //this function returns the profile picture of the user
    fun = (event) => 
    {
  
      fetch('http://localhost:4000/api/image' + "?id=" + this.state.user_id , {
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
  
  //this function is responsible for image upload
  imageHandler = (event) => {
    console.log(event.target.files[0].name)
     
      const file = event.target.files[0];
      const formData = new FormData();
      
      formData.append('image', file)
      var ftch = 'http://localhost:4000/api/image' + "?id=" + this.state.user_id;
    
      fetch(ftch, 
      {
        method:'POST',
        body: formData,
        headers: {
          'Accept': 'multipart/form-data',
  
        },
        credentials : 'include',
      })
      .then(res => res.json())
      .then(res => {
        this.setState({uploadStatus: res.msg});
      })
      .catch(error => {
        console.error(error)
      })
  
      
      this.fun();
  
  
    }
  



    componentDidMount() {
      this.fun();
    }






    render() {       // console.log(this.state.privacy);
      return ( 
        <>
        <div class = "container"> 
        <div class = "pic">
        <img  src={this.state.image} alt="img" width="230" height="230" /></div>
        <div>Change profile picture:</div>
        <div class = "imgSub"><input type="file" name="image" accept="image/*" multiple={false} onChange={this.imageHandler} /></div>


<div class = "pic">
            {this.state.errormessage}
            
            <form>
            {this.state.fields.map((field) => (
              <div>
                <p>Change your {field}:</p>
                <input type="text" name={field} value={this.state[field]} onChange={(e) => {this.setState({[field]: e.target.value })}}/>
              </div>/* for each field render a textbox and update the coresponding column in the mysql table when pressed(mySubmitHandler) */
            ))}
            </form>
            <button onClick={()=> this.mySubmitHandler()}> Submit</button> <br></br></div>
            <div></div>
            </div>
            </>
         );
    }
}
 
export default Settings;