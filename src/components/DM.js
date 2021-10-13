import React , {Component,useState, useRef} from 'react'
import '../style.css'
import Comment from './comment'
import PostList from './PostList'
import get_product from '../pages/home'
import { render } from 'react-dom';
import { postcss } from 'postcss-flexbugs-fixes';
import MessageList from './MessageList'
import DMList from './DMList'
import './DM.css'
import mess from  '../pages/messenger'


import {doSomething} from '../pages/messenger';




class DM extends Component {

    mine() {
        if(this.props.dm.user1 == this.props.user.id)
        {
            console.log("mineeee");
            return 1;
        }
        else
        {
            console.log("NOTTTTT mineeee");
            return 0;
        }
        
    }



    
    render(){
        const mine =this.mine();
    return (
        <>
    <div class = "container">
        {mine ? (
        <div class = "mine"> {this.props.dm.message}</div>
      ) : (
        <div class = "others"> {this.props.dm.message}</div>
      )}


    </div>
        </>
    )
    }
}
 
export default DM;


