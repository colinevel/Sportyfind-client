import React, { useState, useEffect } from 'react';

// styles
import "../styles/filterbar.css";
import 'react-day-picker/lib/style.css';
import { useAuth } from "../auth/useAuth";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';


export default function FilterBar({ clbk, sports, filter, date }) {
    const { isLoading, currentUser } = useAuth();

    const [showCalendar, setShowCalendar] = useState(false);

    moment.updateLocale(moment.locale(), { invalidDate: "Filter by date" })
    

    const [dateFilter, setDateFilter] = useState("")

    const handleClick = e => {
        clbk('resetDate', e)
        setDateFilter("")
        setShowCalendar(!showCalendar)
    }


    return (
        <div className="allfilterbar">
            <div className="filterbartitle">All Events</div>
            <div className="filters">
                <select value={filter} onChange={(e) => clbk('sport', e.target.value)} className="filtersports" >
                    <option value="AllSports"
                    >All Sports</option>
                    {sports.map((sport, i) => (
                        <option key={i} value={sport.name}
                        >{sport.name}</option>
                    ))}
                </select>


                <input onChange={(e) => clbk('search', e.target.value)} className="searchbar" type="text" placeholder="enter city" />
                <div className="calendar">
                    <FontAwesomeIcon
                        onClick={handleClick}
                        className="fal fa-calendar-alt"
                        icon={faCalendarAlt}
                    />
                    {/* {
                        showCalendar
                            ? ( */}
                    <div className={showCalendar ? "datePicker" : "datePicker not-visible"}>
                        <DayPickerInput
                            dayPickerProps={{
                                showWeekNumbers: true,
                                todayButton: 'Today',
                            }}
                            onDayChange={(e) => {
                                clbk('date', e);
                                setDateFilter(e)
                            }}
                            value={moment(dateFilter).format("MMMM Do YYYY")}



                        />
                    </div>
                    {/* )
                            : (
                                null
                            )} */}
                </div>
            </div>
        </div>
    )
}
