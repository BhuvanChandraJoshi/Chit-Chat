import {React, useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css';
import Logo from '../../Images/logo.png';

let user;

const Join = () => {

	const [name, setName] = useState("");

	const sendUser = () => {
		user = name;
		setName("");
	}

	return(
		<div className="JoinPage">
			<div className="JoinContainer">
				<img src={Logo} alt="Logo"/>
				<h1>Chit-Chat</h1>
				<input placeholder="Enter Your Name" onChange={(event) => setName(event.target.value)} type="text" id="joinInput" value={name}/>
				<Link to='/chat' onClick={(event) => !name ? event.preventDefault() : null}>
					<button onClick={sendUser} className="JoinBtn">Sign In</button>
				</Link>
			</div>
		</div>
	)
}

export default Join;
export {user};