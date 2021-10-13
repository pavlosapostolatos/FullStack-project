import React, {Component, useState, useRef } from "react";
import '../style.css'
import Comment from './comment'
import PostList from './PostList'
import get_product from '../pages/home'
import { render } from 'react-dom';
import { postcss } from 'postcss-flexbugs-fixes';
import MessageList from './MessageList'
import './Message.css'
import mess from  '../pages/messenger'
import DMList from './DMList'



var opend=1;

class Message extends Component {

    

    state = {
        chat : [],
        postTextRef:null,
        chater:null

    };

    choseChat= e => {

      if(opend == 0)
      {
        const empt= [];
        this.setState({ chat : empt});
        console.log("iiiiiiiinnnnnn");
        opend = 1;
      }
      else
      {

        var st = "http://localhost:4000/private_chat" + "?usr1=" + this.props.user.id + "&usr2=" + this.props.messeges.user2;

    fetch(st)
      .catch((err) => console.error(err));

        st = "http://localhost:4000/select_private"
      fetch(st)
      .then((response) => response.json())
      .then(response => this.setState({ chat : response.data}))
      .catch((err) => console.error(err));

      this.scrollToBottom();
      opend =0;

      }


      }

      handleText = e => {
        this.setState({postTextRef: e.target.value});
      }

      handleEmpt = e => {
        this.setState({chat: e.target.value});
      }

      handleName = e => {
        this.setState({chater: e[0].name});
        console.log("haaaaaandl:");
        console.log( this.state.chater);
      }


      send_mess = e => {
        const text = this.state.postTextRef;
        var today = new Date(),

        date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' +today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();  
        console.log(date);

        var st = "http://localhost:4000/insert_chat" + "?usr1=" + this.props.user.id + "&usr2=" + this.props.messeges.user2 + "&date=" + date + "&message=" + text;
        fetch(st)
        .catch((err) => console.error(err));

        console.log(this.props.user.id);
        console.log(this.props.messeges.user2);
        opend = 1;
        this.choseChat();
      }


      get_name(){

        const st = "http://localhost:4000/user/id" + "?id=" + this.props.messeges.user2;
        
      fetch(st)
      .then(response => response.json())
      .then(response => this.handleName(response.data))
      .catch((err) => console.error(err));

      }

/*
      componentDidMount() {
        this.get_name();
    
      }
    */

      componentDidMount() {
        this.get_name();
        console.log("------");
        console.log(this.props.messeges.user2);
        console.log(this.props.user);
        console.log("------");
        
        

        
    
      }

      componentDidUpdate() {
        this.scrollToBottom();
      }


      scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "instant" });
      }
    
    render(){

    return (
      <>
        
      <div class = "friend"> {this.state.chater}</div>


      {opend ? (
          <div ><button onClick={this.choseChat}>chat</button></div>
      ) : (
          <div> <button onClick={this.choseChat}>hide</button></div>
      )}

      <div class = "mess">
      
      
          <div class = "dmslist" ><DMList DMList={this.state.chat} user={this.props.user} /></div>

      <div style={{ float:"left", clear: "both" }}
           ref={(el) => { this.messagesEnd = el; }}>
      
      </div>
      </div>
      {opend ? (
          <div> </div>
      ) : (
        <div class ="dmslist"><textarea value={this.state.Text} ref={this.state.postTextRef} onChange={this.handleText}rows="2" cols="25" ></textarea></div>

      )}

      {opend ? (
          <div> </div>
      ) : (
          <div class = "dmslist"><button onClick={this.send_mess} >send</button></div>
      )}    
      
      


     

      </>
    )
    }
}
 
export default Message;


