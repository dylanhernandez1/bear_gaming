import { useState, useEffect, useRef, createRef} from "react";
import minecraft from "./dashboard_images/minecraft2048x2048.png";
import roblox from "./dashboard_images/Roblox.png";
import fortnite from "./dashboard_images/Fortnite.jpg";
import left_arrow from "./left-arrow.png";
import right_arrow from "./right-arrow.png";
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
		console.log('Button clicked');
	}

	return (
	<div className={"row"}>
		<div className="container">
			<button onClick={onHandleClick}>
				<img src={left_arrow} alt="Clickable left button" className="slider-buttons"/>
			</button>
			
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
			
			<button onClick={onHandleClick}>
				<img src={right_arrow} alt="Clickable left button" className="slider-buttons"/>
			</button>
		</div>
	</div>
	);
};

export default Dashboard;
