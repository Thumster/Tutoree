import React from 'react';
import NavSearched from '../Nav/NavSearched';
import ChoiceTab from './ChoiceTab';
import {connect} from 'react-redux'
import PostList from './PostList';

class Dashboard extends React.Component {
    render() {
        console.log(this.props);
        const {posts} = this.props;

        return (
            <div>
            <NavSearched/>
            <ChoiceTab/>
            <PostList posts={posts}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.posts
    }
}
export default connect(mapStateToProps)(Dashboard)