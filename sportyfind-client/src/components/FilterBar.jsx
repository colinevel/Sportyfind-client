import React from 'react';
import Calendar from "./Calendar";

// styles
import "../styles/filterbar.css";
import 'react-day-picker/lib/style.css';


export default function FilterBar({ clbk,sports }) {
    console.log("this is spôrts", sports)

    // const [calendar, setCalendar] = useState(null);
    // const handleClick = e => 
    
    return (
        <div className="allfilterbar">
            <div className="filterbartitle">All Events</div>
            <div className="filters">
                <select onChange={(e) => clbk('sport', e.target.value)} className="filtersports">
                    <option value="All Sports"
                    >All Sports</option>
                    {/* <select name="sport" id="sport" value={clbk.sport}> */}
                    {sports.map((sport, i) => (
                        <option key={i} value={sport._id}
                        >{sport.name}</option>
                    ))}

                    {/* <option value="football"
                    >football</option>
                    <option value="tennis"
                    >tennis</option> */}
                </select>


                <input onChange={(e) => clbk('search', e.target.value)} className="searchbar" type="text" placeholder="enter city" />

                <Calendar />
                {/* <input onChange={(e) => clbk('date', e.target.value)} className="research-date" type="date" /> */}


                {/* <input onChange={(e) => clbk('pastEvents', e.target.checked)} type="checkbox" name="pastEvents" />
                <label htmlFor="pastEvents">show past events</label> */}
            </div>
        </div>
    )
}
