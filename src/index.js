import React, { Component } from 'react';
import reactDOM from "react-dom";
import quizService from "./quizService";
import "./assets/style.css";
import 	QuestionBox from "./Components/Question";
import 	Result from "./Components/Result";



class QuizBee extends Component {
	state = {
		questionBank: [],
		score: 0,
		responses: 0
	};

	getQuestion = () => {
		quizService().then(question => {
			this.setState({
				questionBank: question
			});
		});

	};

	playAgain = () => {
		this.getQuestion();
		this.setState({
			score: 0,
			responses :0
		});
	};

	computeAnswer = (answer, correctAnswer) => {
		if (answer === correctAnswer) {
			this.setState({
				score: this.state.score + 1
			});

		}
		this.setState({
			responses: this.state.responses < 5 ? this.state.responses + 1 : 5
		});
	};

	componentDidMount() {
		this.getQuestion();
	}

	render() {
		return(

			<div className="container">
			<h1></h1>
					<div className="title"><h3>QuizBee</h3></div>
					
					{this.state.questionBank.length > 0 && 
						this.state.responses < 5 &&
						this.state.questionBank.map(
						({question, answers , correct, questionId}) => (
						<QuestionBox question={question} 
						options={answers} 
						key={questionId}
						selected={answer => this.computeAnswer(answer, correct)}


						 /> 
						 ) 
						) }
						
						{this.state.responses === 5 ? (
							<Result score={this.state.score} playAgain={this.playAgain} /> ): null}

			</div>
			);
		
	}
}
reactDOM.render(<QuizBee />, document.getElementById("root"))
