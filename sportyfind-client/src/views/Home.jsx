import React, { useEffect, useState } from "react";
import SportsList from "./../components/SportsList";
import SportsCard from "./../components/SportsCard";
import Header from "./../components/Header";

import apiHandler from "../api/APIHandler";
import { Link } from "react-router-dom";

export default function Home() {
  const [sport, setSport] = useState(null);

  useEffect(() => {
    apiHandler
      .get(`/sports`)
      .then(res => {
        setSport(res.data.sports);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!sport) return <div>No sports yet</div>;
  return (
    <div>
        <Header />
      <h1 className="title">Events By Sport</h1>
      <div>
        {sport.map((sport, i) => (
          <Link to={`/sports/${sport._id}`}>
            <div key={i}>
              <h2>{sport.name}</h2>
              <img src={sport.image} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// export default class Home extends Component {
//   state = {
//     sports: []
//   };

//   render() {
//     return (
//       <div>
//         <h1>HOME PAGE</h1>
//         <h1>Events By Sport</h1>
//         <SportsList data={this.state.sports} Component={SportsCard} />
//       </div>
//     );
//   }
// }
