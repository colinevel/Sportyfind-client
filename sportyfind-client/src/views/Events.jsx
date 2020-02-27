import React, { Component } from 'react'
import CardsList from "../components/CardsList";
import FilterBar from "../components/FilterBar";
import apiHandler from "../api/APIHandler";






export default class Events extends Component {

    state = {
        filterBySport: "",
        filterByCity: "",
        // filterByDate: "",
        sports: [],
        events: []
    }

    componentDidMount() {

        Promise.all([apiHandler.get("/sports"), apiHandler.get("/events")])
            .then(apiRes => {
                this.setState({ sports: apiRes[0].data.sports, events: apiRes[1].data.events })
            })
            .catch(apiErr => console.error(apiErr));
    }



    eventsFiltered = () => {
        return this.state.events.filter((p) => {
            if(this.state.filterBySport === "All Sports") {return p.localisation.toLowerCase().includes(this.state.filterByCity.toLowerCase())}
            else if (this.state.filterBySport !== p.sport) { return false }
            return p.localisation.toLowerCase().includes(this.state.filterByCity.toLowerCase())
        })
    }


    onFilterBarUpdate = (type, value) => {
        if (type === 'sport') { this.setState({ filterBySport: value }) }
        if (type === 'search') { this.setState({ filterByCity: value }) }
        // if (type === 'date') { this.setState({ filterByDate: value }) }
        if (type === 'pastEvents') { this.setState({ filterByPastEvents: value }) }
    }



    render() {
        return (
            <div>
                navBar
                <hr />
                <FilterBar clbk={this.onFilterBarUpdate} sports={this.state.sports}/>
                <hr />
                <CardsList events={this.eventsFiltered()} />
            </div>
        )
    }
}
