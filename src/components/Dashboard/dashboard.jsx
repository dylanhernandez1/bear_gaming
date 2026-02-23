import { useState, useEffect, useRef, createRef} from "react";
import minecraft from "./dashboard_images/minecraft2048x2048.png";
import roblox from "./dashboard_images/Roblox.png";
import fortnite from "./dashboard_images/Fortnite.jpg";
import left_arrow from "./left-arrow.png";
import right_arrow from "./right-arrow.png";
import "./dashboard.css"

const width_size = 250;
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

const totalWidth = width_size * data.length;
const visibleWidth = 2.5 * width_size;
const max_position = totalWidth - visibleWidth;

const overlay_data = ["Fortnite", "Minecraft", "Roblox"];

const Dashboard = () => {
	const [position, setPosition] = useState(0);
	const dashboardRef = useRef(null);

	function onHandleClick (change_amount) {
		console.log("clicked");
		console.log("Change amount:", change_amount);
		setPosition(prev => {
			const new_position = prev + change_amount;
			console.log("New Position:", new_position);
			if (new_position < 0)
			{
				return 0;
			}
			else if (new_position > max_position)
			{
				return max_position;
			}
			
			return new_position;
		});
	}
	

	return (
	<div className={"dashboard"}>
		<div className="carousel">
			<button onClick={() => onHandleClick(-visibleWidth)}>
				<img src={left_arrow} alt="Clickable left button" className="slider-buttons"/>
			</button>
			
			<div className="row" ref={dashboardRef} style={{ transform: `translateX(-${position}px)` }}>
				{data.map((v, i) => (
					<div key={i} className="Slider">
						<img src={v.src} className="dashboard-image" />
						<div className="overlay">
							<div className="overlay-text">{overlay_data[i]}</div>
						</div>
					</div>
				))}
			</div>
			
			<button onClick={() => onHandleClick(visibleWidth)}>
				<img src={right_arrow} alt="Clickable right button" className="slider-buttons"/>
			</button>
		</div>
	</div>
	);
};

export default Dashboard;
