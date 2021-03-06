import React, { Component } from 'react';
import { Link ,withRouter} from 'react-router-dom';
import { signout,isAuthenticated} from "../auth" 

const isActive = (history,path) => {
    if(history.location.pathname === path) return { color:"#ff9900"}
    else return { color : "#ffffff"}
}


const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary" >
            <li className="nav-item">
                <Link to="/" className="nav-link " style={isActive(history,"/")} >Home</Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link " style={isActive(history,"/signin")}>Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link " style={isActive(history,"/signup")}>Sign Up</Link>
                    </li>
                </>
            )}


            {isAuthenticated() && (
                <>    
                    <li className="nav-item">
                        <a to="/signout" className="nav-link " style={isActive(history,"/signout")} onClick={() => signout(() => history.push("/"))}>Sign Out</a>
                    </li>

                    <li className="nav-item">
                            <Link className="nav-link " to={`/user/${isAuthenticated().user._id}`} style={{color:"#fff"}}>
                                {`${isAuthenticated().user.name}'s Profile`}
                            </Link>
                    </li>
                </>
                )}
        </ul>
    </div>
);

export default withRouter(Menu) ;
