import React from "react";

const Result = ({score, playAgain}) => (

	<div className="score-bord">

		<div className="score"> you score {score} </div>
		<button className="playBtn" onClick={playAgain}>play Again</button>
	</div>


	);

	export default Result;