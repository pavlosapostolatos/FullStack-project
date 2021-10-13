import PostList from "../components/PostList";
import '../style.css';
import React, {Component, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";



class Home extends Component {
  state = {
    posts: [],
    recommended_posts : [],
    image: '',
    subjects: null,
    postNameRef:null,
    postTextRef:null,
    subjects : null
  };

  handleTitle = e => {
    this.setState({postNameRef: e.target.value});
  }
  handleText = e => {
    this.setState({postTextRef: e.target.value});
  }
  handleSubjects = e => {
    this.setState({subjects: e.target.value});
  }

  //this function is responsible for post uploads    
  handleAddTodo = e => {
    const name = this.state.postNameRef;
    if (name === "") return;
    console.log(name);

    const text = this.state.postTextRef;
    if (text === "") return;
    console.log(text);
    const add = { name, text };
    //uploading post in database
    var st =
      "http://localhost:4000/posts/add" +
      "?title=" +
      name +
      "&text=" +
      text +
      "&likes=0" +
      "&author_id=" + this.props.user.id+

      "&image=" + this.state.image;
    console.log(st);
    fetch(st)
    .catch((err) => console.error(err));

    this.get_content();
  }

  //getting all the content we need (Posts and aggelies)
  get_content= e => {
    var url;
    if (this.props.aggelia===true)/*because posts and listings both use the home and post component check which the user picked */
    url="http://localhost:4000/aggelies" + "?user_id=" +this.props.user.id;
    else 
    url="http://localhost:4000/friendsposts" + "?user_id=" +this.props.user.id;

    fetch(url)
      .then((response) => response.json())
      .then(response => this.setState({ posts : response.data}))
      .catch((err) => console.error(err));

  }
  get_recommendations= e => {
    var url="http://localhost:4000/matrix_factorization" + "?user_id=" +this.props.user.id + "&random=0";
    fetch(url)
    .then((response) => response.json())
    .then(response => this.setState({ recommended_posts : response.data}))
    .catch((err) => console.error(err));
  }


  componentDidMount() {
    this.get_content();
    this.get_recommendations();
  }

  imageHandler = (event) => {
    console.log(event.target.files[0].name)

    this.setState({
      image : 'uploads/' + event.target.files[0].name ,
    });

    const file = event.target.files[0];
      const formData = new FormData();
      
      formData.append('image', file)
      var ftch = 'http://localhost:4000/api/image/post';
    
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
  
    }


  render() {
    return (
      <>
        <div>Subject:</div>{/*input areas for each part of a post*/}
        <div>
          <input ref={this.state.postNameRef} type="text" onChange={this.handleTitle}/>{" "}
        </div>
        <div> Text:</div>
        <textarea ref={this.state.postTextRef} onChange={this.handleText}rows="4" cols="25"></textarea>
        <div></div>
        {this.props.aggelia===true ? 
        <React.Fragment>
        <div> Subjects:</div>
        <div> <textarea ref={this.state.subjects} onChange={this.handleSubjects}rows="4" cols="25"></textarea> </div> 
        </React.Fragment>: " "}


        <div>Upload image:</div>
        <div><input type="file" name="image" accept="image/*" multiple={false} onChange={this.imageHandler}/></div>




        
        
        <button class = "button" onClick={this.handleAddTodo}> Upload Post !</button>
        <div>---------------------------------------</div>
        <div>Posts:</div>
        <PostList postList={this.state.posts} user={this.props.user} />
        <div><h1>Posts recommended by matrix factorization:</h1></div>
        <PostList postList={this.state.recommended_posts} user={this.props.user} />
      </>
    );
  }
}

export default Home;
