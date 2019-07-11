import React from 'react';
import PostCard from '../Post/PostCard/PostCard';

const cards = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
};

const PostList = () => {
    return (
        <div style={cards}>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    );
}

export default PostList