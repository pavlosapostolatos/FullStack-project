import React from 'react'
import DM from './DM';
export default function DMList({DMList,user}) {
    return (
        DMList.map(dm => {
            return <DM dm={dm} user={user} />
            })  
    )
}