import React from 'react'
import Message from './Message';
export default function MessageList({messageList,user}) {
    return (
        messageList.map(messeges => {
            return <Message messeges={messeges} user={user} />
            })  
    )
}