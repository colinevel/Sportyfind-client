import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./../styles/header.css";




export default function Footer () {
  return (

    <div>    
    <footer className="footer">
        <div className="linkedin">

        <div className="namelkdn">
        <p>Coline</p>
        <a href="http://www.linkedin.com/in/coline-velard-2b537058"><img className="linkedinimg" src="../../images/iconfinder_square-linkedin_317725.png" alt="linkedIn"/></a>
        </div>

        <div className="namelkdn">
        <p>Baptiste</p>
        <a href="https://www.linkedin.com/in/baptiste-wargny-52441513b"><img className="linkedinimg" src="../../images/iconfinder_square-linkedin_317725.png" alt="linkedIn"/></a>
        </div>

        <div className="namelkdn">
        <p>Mehmet</p>
        <a href="http://www.linkedin.com/in/mehmetcanozmen"><img className="linkedinimg" src="../../images/iconfinder_square-linkedin_317725.png" alt="linkedIn"/></a>
        </div>
        </div>

        
        <div className="Sportyfindname">Sportyfind ©</div>

    </footer>
    </div>
  )
}