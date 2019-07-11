import React from 'react';
import NavSearched from '../Nav/NavSearched';
import ChoiceTab from './ChoiceTab';

export default class Searched extends React.Component {
    render() {
        return (
            <div>
            <NavSearched/>
            <ChoiceTab/>
            </div>
        );
    }
}