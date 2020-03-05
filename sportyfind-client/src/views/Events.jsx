import React, { Component } from 'react'
import CardsList from "../components/CardsList";
import FilterBar from "../components/FilterBar";
import apiHandler from "../api/APIHandler";
import moment from 'moment';



export default class Events extends Component {

    state = {
        filterBySport: this.props.history.location.search.replace("?sport=", ""),
        filterByDate: "",
        filterByCity: "",
        sports: [],
        events: [],
        display:false
    }

    getEvents = () => {
        Promise.all([apiHandler.get("/sports"), apiHandler.get("/events")])
            .then(apiRes => {
                this.setState({ sports: apiRes[0].data.sports, events: apiRes[1].data.events })
            })
            .catch(apiErr => console.error(apiErr));
    }

    componentDidMount() {
        this.getEvents()
    }


    eventsFiltered = () => {


        return this.state.events.filter((p) => {
            
            if (this.state.filterByDate === "") {
                if (this.state.filterBySport === "AllSports") { return p.localisation.toLowerCase().includes(this.state.filterByCity.toLowerCase()) }
                else if (this.state.filterBySport !== p.sport.name) return false;

                return p.localisation.toLowerCase().includes(this.state.filterByCity.toLowerCase())
            }
            else if (moment(this.state.filterByDate).format("MMMM Do YYYY") !== moment(p.date).format("MMMM Do YYYY")) return false

            else if (this.state.filterBySport === "AllSports") { return p.localisation.toLowerCase().includes(this.state.filterByCity.toLowerCase()) }
            else if (this.state.filterBySport !== p.sport.name) return false;


            return p.localisation.toLowerCase().includes(this.state.filterByCity.toLowerCase())
        })
    }


    onFilterBarUpdate = (type, value, event) => {
        if (type === 'sport') { this.setState({ filterBySport: value }) }
        if (type === 'search') { this.setState({ filterByCity: value }) }
        if (type === 'date') { this.setState({ filterByDate: value }) }
        if (type === 'resetDate') { this.setState({ filterByDate: "" }) }
        // if (type === 'pastEvents') { this.setState({ filterByPastEvents: value }) }

    }




    render() {
        return (
            <div>
             <div className="filterbartitle">All Events</div> 
                {/* <hr /> */}
                <FilterBar clbk={this.onFilterBarUpdate}
                    filter={this.state.filterBySport} sports={this.state.sports} display={this.state.display} />
                {/* <hr /> */}
                <CardsList history={this.props.history} events={this.eventsFiltered()} clbk={() => this.getEvents()} />
            </div>
        )
    }
}
