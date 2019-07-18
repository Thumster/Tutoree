import React from 'react';
import NavSearched from '../Nav/NavSearched';
import ChoiceTab from './ChoiceTab';
import PostList from './PostList';

class Dashboard extends React.Component {
    render() {

        return (
            <div>
            <NavSearched/>
            <ChoiceTab/>
            <PostList />
            </div>
        );
    }
}

export default Dashboard
