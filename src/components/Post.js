import React , {Component,useState, useRef} from 'react'
import '../style.css'
import Comment from './comment'
import PostList from './PostList'
import get_product from '../pages/home'
import { render } from 'react-dom';
import { postcss } from 'postcss-flexbugs-fixes';




class Post extends Component {
    state = {
        likes:this.props.post.likes,
        current_user_likes :false,
        comments : [],
        image:'',
        NewComment:null
    };
    // constructor(props){
    componentDidMount(){
        this.fun();
        console.log(this.props.post.image)   
        //identifying if the loged-in user liked this post 
        var st = "http://localhost:4000/likes" + "?user_id=" + this.props.user.id + "&post_id=" + this.props.post.id;
        fetch(st)
          .then((response) => response.json())
          .then(({ data }) =>  {if(data.length) { this.setState({current_user_likes : true}) } })
          .catch((err) => console.error(err));
        this.get_comments();
    }

    get_comments = () =>{
        var st = "http://localhost:4000/comments" + "?post_id=" + this.props.post.id;
        fetch(st)
        .then((response) => response.json())
        .then(({ data }) =>  this.setState({comments : data}))
        .catch((err) => console.error(err));
    }
    

    handleComment = e => {
        this.setState({NewComment: e.target.value});
    }

    handleAddComment = e => {
        console.log("added comment");
        const text = this.state.NewComment;
        if (text === "") return;
        console.log(text);
        //adding post's comment to our database
        var st =
          "http://localhost:4000/comments/add" +
          "?text=" +
          text +
          "&post_id=" +
          this.props.post.id +
          "&author_id=" + this.props.user.id;
        console.log(st);
        fetch(st).catch((err) => console.error(err));//{post_id,LikeCom,user_name,author_id}
        //Informing post's author that the loged-in user liked his post
        st =
        "http://localhost:4000/notifications/add" +
        "?user_name=" +
        this.props.user.name +
        "&post_id=" +
        this.props.post.id +
        "&author_id=" + this.props.post.author_id + "&LikeCom=0" ;
        fetch(st).catch((err) => console.error(err));
        this.get_comments();
    }


    fun = (event) => 
    {
  
      fetch('http://localhost:4000/api/image/post' + "?id=" + this.props.post.id , {
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



  //it works the same way as the handle comment 
    handleLike = () => {
        if (this.state.current_user_likes){
            const temp = this.state.likes - 1;
            var st = "http://localhost:4000/dellike" + "?user_id=" + this.props.user.id + "&post_id=" + this.props.post.id + "&likes=" + temp ;
            fetch(st)
              .then((response) => response)
              .catch((err) => console.error(err));
            this.setState({current_user_likes : false, likes : this.state.likes - 1});
        }
        else {
            const temp = this.state.likes + 1;
            var st = "http://localhost:4000/newlike" + "?user_id=" + this.props.user.id + "&post_id=" + this.props.post.id + "&likes=" + temp;
            fetch(st)
              .then((response) => response)
              .catch((err) => console.error(err));
            this.setState({current_user_likes : true, likes : this.state.likes + 1});
            st =
            "http://localhost:4000/notifications/add" +
            "?user_name=" +
            this.props.user.name +
            "&post_id=" +
            this.props.post.id +
            "&author_id=" + this.props.post.author_id + "&LikeCom=1" ;
            fetch(st).catch((err) => console.error(err));
        }


    };
    render(){
    return (
        <>
        <div class = "post">
            <div class = "formtitle"> author:</div>
            <div class = "title"> {this.props.post.name}</div>
            <div class = "formtitle"> Title:</div>
            <div class = "title"> {this.props.post.title}</div>
            
            <div class = "formtitle"> text:</div>
            <div class = "text"> {this.props.post.text}</div>
           <div> <img class = "pic" src={this.state.image} alt="img" width="230" height="230" /></div>
            

            <button onClick = {() => this.handleLike()}> {!this.state.current_user_likes ? "Like" : "Unlike"} !</button>{/*option to unlike if you like it now */}
            <div class = "formtitle"> likes:</div>
            <div class = "text"> {this.state.likes}</div>
            {this.props.post.subjects ? this.props.post.subjects.split(" ").map((subject) => ( <small> #{subject} </small>)) : " "}{/*if this is an aggelia i.e it has subjects print them*/}
            
            {this.state.comments.map((comment) => (
            <Comment 
            key={comment.id}
            comment={comment}
            >
            </Comment>
            ))}
            <div>
                Enter your comment:
                <input ref={this.state.NewComment} type="text" onChange={this.handleComment}/>{" "}
                <button onClick={() => this.handleAddComment()}> Upload!</button>
            </div>
            </div>

        </>
    )
    }
}
 
export default Post;


