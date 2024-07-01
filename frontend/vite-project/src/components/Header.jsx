// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggle = () => setIsOpen(!isOpen);

//     return (
//         <nav class="navbar navbar-expand-lg navbar-light bg-light">
//             <a class="navbar-brand" href="#">The GymGoers</a>
//             <button class="navbar-toggler" type="button" onClick={toggle} data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class={`${isOpen ? 'show' : ''} collapse navbar-collapse`} id="navbarNav">
//                 <ul class="navbar-nav">
//                 <li class="nav-item active">
//                     <a class="nav-link" href="#">Login<span class="sr-only">(current)</span></a>
//                 </li>
//                 <li class="nav-item">
//                     <a class="nav-link" href="#">Sign Up</a>
//                 </li>
//                 </ul>
//             </div>
//         </nav>
//     )

// }

// export default Header

import { Link } from 'react-router-dom';

import React, { useState } from 'react';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <a className="navbar-brand fw-bold text-success ms-3" href="#">The GymGoers</a>
            <button className="navbar-toggler bg-success me-3" type="button" onClick={toggle} aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`${isOpen ? 'show' : ''} collapse navbar-collapse`} id="navbarNav">
                {!props.loggedIn &&
                    <ul className="navbar-nav">
                        <li className="nav-item active ">
                            <Link className="nav-link fw-bold text-success" to="/login">Login<span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold text-success" to="/sign-up">Sign Up</Link>
                        </li>
                    </ul>                   
                }
                {props.loggedIn &&
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link fw-bold text-success" to="/">Dashboard<span className="sr-only"></span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold text-success" to="/log">Log workout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold text-success" to="/viewWorkouts">View workout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-bold text-success" to="/">GymGroups</Link>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    );
}

export default Header;