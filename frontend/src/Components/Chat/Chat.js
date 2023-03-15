import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import SocketIO from 'socket.io-client';
import ReactScrollToBottom from 'react-scroll-to-bottom';

import {user} from '../Join/Join.js';
import './Chat.css';
import SendLogo from '../../Images/send.png';
import Message from '../Message/Message.js';
import closeIcon from '../../Images/closeIcon.png';

let socket;

const ENDPOINT = "http://localhost:5000";

const Chat = () => {

	const [id, setId] = useState("");

	const [messages, setMessages] = useState([]);

	const sendMessage = () => {
		const message = document.getElementById('chatInput').value;
		socket.emit('message', {message, id});
		document.getElementById('chatInput').value = "";
	}

	useEffect(() => {
		socket = SocketIO(ENDPOINT, {transports: ['websocket']});

		socket.on('connect', () => {
			// alert("Connected");
			setId(socket.id);
		})

		socket.emit('joined', {user});

		socket.on('welcome', (data) => {
			setMessages([...messages, data]);
		})

		socket.on('userJoined', (data) => {
			setMessages([...messages, data]);
		})


		socket.on('leave', (data) => {
			setMessages([...messages, data]);
		})

		return () => {
			socket.emit('disconnected');
			socket.off();
		}

	}, [])

	useEffect(() => {
		socket.on('sendMessage', (data) => {
			setMessages([...messages, data]);
		})
		return () => {
			socket.off();
		}
	}, [messages])

	return(
		<div className="chatPage">
			<div className="chatContainer">
				<div className="chatHeader">
					<h2>Chit-Chat</h2>
					<Link to="/"><img src={closeIcon} alt="closeIcon"/></Link>
				</div>
				<ReactScrollToBottom className="chatBox">
					{messages.map((data, index) => {
						return <Message user={data.id===id?'':data.user} message={data.message} classs={data.id===id?'right':'left'}/>
					})}
				</ReactScrollToBottom>
				<div className="inputBox">
					<input type="text" id="chatInput" onKeyPress={(event) => event.key === 'Enter' ? sendMessage() : null}/>
					<button onClick={sendMessage} className="sendBtn">
						<img src={SendLogo} alt="SendLogo"/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Chat;