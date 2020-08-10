import React, { Component } from "react";
import { QuizMarvel } from "../QuizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";

class Quiz extends Component {
  state = {
    levelNames: ["debutant", "confirme", "expert"],
    quizlevel: 0,
    maxQuestions: 10,
    storedQuestions: [],
    questions: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
  };

  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      );
      this.setState({
        storedQuestions: newArray,
      });
    } else {
      console.log("Pas assez de questions");
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizlevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.storedQuestions !== prevState.storedQuestions) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  render() {
    // const { pseudo } = this.props.userData;

    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          key="index"
          className={`answerOptions ${
            this.state.userAnswer === option ? "selected" : null
          }`}
          onClick={() => this.submitAnswer(option)}
        >
          {option}
        </p>
      );
    });

    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button disabled={this.state.btnDisabled} className="btnSubmit">
          Suivant
        </button>
      </div>
    );
  }
}

export default Quiz;