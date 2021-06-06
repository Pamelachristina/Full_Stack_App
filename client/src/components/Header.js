/**
 * Header component
 *  - displays on all routes
 *  - displays top menu bar for the application
 *  - includes buttons for signing in and signing up (if there's not an authenticated user)
 *  - includes user's name and a button for signing out (if there's an authenticated user)
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.PureComponent{
	render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
		return(
			<header>
				<div className="wrap header--flex">
					<h1 className="header--logo">
						<NavLink to="/">Courses</NavLink>
					</h1>
					<nav>
						{
							authUser?
							<React.Fragment>
								<ul className="header--signedin">
									<li>Welcome, {authUser.firstName} {authUser.lastName}! </li>
									<li><NavLink to="/signout"> Sign Out</NavLink></li>
								</ul>
							</React.Fragment>
							:
							<React.Fragment>
								<ul className="header--signedout">
									<li><NavLink to="/signup">Sign Up</NavLink></li>
									<li><NavLink to="/signin">Sign In</NavLink></li>
								</ul>
							</React.Fragment>
						}
					</nav>
				</div>
			</header> 
		);
	}
};