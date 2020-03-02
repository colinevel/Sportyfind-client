import React, { Component } from 'react'
import CardsList from "../components/CardsList";
import FilterBar from "../components/FilterBar";
import apiHandler from "../api/APIHandler";



export default class Events extends Component {
  
    state = {
        filterBySport: this.props.history.location.search.replace("?sport=", ""),
        filterByCity: "",
        // filterByDate: "",
        test: this.props,
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

    componentDidUpdate() {

    }


    eventsFiltered = () => {
    
        return this.state.events.filter((p) => {
            if(this.state.filterBySport === "AllSports") {return p.localisation.toLowerCase().includes(this.state.filterByCity.toLowerCase())}
            else if (this.state.filterBySport !== p.sport.name)  return false;
            
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
                {/* <hr /> */}
                <FilterBar clbk={this.onFilterBarUpdate} filter={this.state.filterBySport} sports={this.state.sports}/>
                {/* <hr /> */}
                <CardsList events={this.eventsFiltered()} />
            </div>
        )
    }
}
