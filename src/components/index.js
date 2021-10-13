import React, { Component } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';



//handling what exists in our navbar
class Navbar extends Component {
	state = { signed_in: false  }
	handleLogin = () => {
		const signed_in = true;
		this.setState({ signed_in });
	};

	render() { 
		if( ! (this.props.user && this.props.user.admin===1) )
		// console.log(this.props)
		if(this.props.logged_in===true)
		return (
			<div>
			<Nav>
				<Bars />
		
				<NavMenu>
				<NavLink to='/settings' activeStyle>
					Settings
				</NavLink>
				<NavLink to='/personal' activeStyle>
					Personal Data
				</NavLink>
				<NavLink to='/notifications' activeStyle>
					Notifications
				</NavLink>
				<NavLink to='/messenger' activeStyle>
					Messenger
				</NavLink>
				<NavLink to='/net' activeStyle>
					Net
				</NavLink>
				<NavLink to='/aggelies' activeStyle>
					Aggelies
				</NavLink>
				<NavBtn>
				<NavBtnLink to='/home' >Home</NavBtnLink>
				</NavBtn>
				</NavMenu>
			</Nav>
			</div>
		);
		else{
			return (
			<div>
				<NavBtn>
				<NavBtnLink to='/signin'>Sign In</NavBtnLink>
				</NavBtn>	
				<NavBtn>
				<NavBtnLink to='/signup' >Sign Up</NavBtnLink>
				</NavBtn>	
			</div>
			);
		}
		else return (null);
	}
}
 

export default Navbar;
