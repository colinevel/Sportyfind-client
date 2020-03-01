import React, { Component } from 'react';
import FilterBar from "./../components/FilterBar";


export default class MyDashboard extends Component {

    state = {
        filterBySport: "",
        filterByCity: "",
        // filterByDate: "",
        sports: [],
        events: []
    }
    
    render() {
        return (
            <div>
                <FilterBar clbk={this.onFilterBarUpdate} sports={this.state.sports}/>
            </div>
        )
    }
}


