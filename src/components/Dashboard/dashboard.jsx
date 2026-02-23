import { useState, useEffect, useRef, createRef} from "react";
import minecraft from "./dashboard_images/minecraft2048x2048.png";
import roblox from "./dashboard_images/Roblox.png";
import fortnite from "./dashboard_images/Fortnite.jpg"

import "./dashboard.css"

const data = [
	{
		src: fortnite
	},
	{
		src: minecraft
	},
	{
		src: roblox
	}
];

const overlay_data = ["Fortnite", "Minecraft", "Roblox"];

const Dashboard = () => {

	const dashboardRef = useRef(null);
	function onHandleClick () {
		
	}

	return (
	<div className={"row"}>
		<div className="container">
			<div className="dashboard" ref={dashboardRef}>
				{data.map((v, i) => (
					<div key={i} className="Slider">
						<img src={v.src} className="dashboard-image" />
						<div className="overlay">
							<div className="overlay-text">{overlay_data[i]}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	</div>
	);
};

export default Dashboard;
