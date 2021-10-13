import React from 'react'
import Post from './Post';

function PostList({postList,user}) {/* prints list of posts */
    return (
        postList.map(post => {
                return <Post key = {post.id} post={post} user={user} />
            })  
    )
}
export default PostList;