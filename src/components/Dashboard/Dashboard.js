import React from 'react';
import NavSearched from '../Nav/NavSearched';
import ChoiceTab from './ChoiceTab';
import {connect} from 'react-redux'
import PostList from './PostList';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { firestore } from 'firebase';

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
    console.log(state);
    return {
        posts: state.firestore.ordered.posts
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'posts'}
    ])
)(Dashboard)
