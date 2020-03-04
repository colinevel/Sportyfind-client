import React, { useEffect, useState } from "react";
import SportsList from "./../components/SportsList";
import apiHandler from "../api/APIHandler";

export default function Home() {
  const [sports, setSport] = useState(null);

  useEffect(() => {
    apiHandler
      .get(`/sports/selected`)
      .then(res => {
        // console.log("this is it", res.data.sports);
        setSport(res.data.sports);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (!sports) return <div>No sports yet</div>;
  return (
    <div>
      <h1 className="title">Choose your Sport</h1>
      <SportsList sports={sports}/>
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
