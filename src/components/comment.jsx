import React , {Component} from 'react'
import '../style.css'

class Comment extends Component {
    state = {  };
    render() { 
        return ( 
            <div class = "com">
                <small>{this.props.comment.name} :</small>
                <p>{this.props.comment.text}</p>
                <small>likes : {this.props.comment.likes}</small>
            </div>
        );
    }
}
 
export default Comment;