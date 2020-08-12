import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestions,
    quizlevel,
    percent,
    loadLevelQuestions,
  } = props;

  const [asked, setAsked] = useState([]);
  // console.log(asked);

  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  const averageGrade = maxQuestions / 2;

  if (score < averageGrade) {
    // setTimeout(() => {
    //   loadLevelQuestions(0);
    // }, 3000);
    setTimeout(() => {
      loadLevelQuestions(quizlevel);
    }, 3000);
  }

  const decision =
    score >= averageGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizlevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Bravo! Passez au niveau suivant!</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(quizlevel)}
              >
                Niveau suivant
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">Bravo! Vous êtes un expert!</p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </Fragment>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}%</div>
          <div className="progressPercent">
            Note {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué!</p>
        </div>

        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}</div>
          <div className="progressPercent">
            Note {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    );

  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button className="btnInfo">Infos</button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <div className="loader"></div>
          <p style={{ textAlign: "center", color: "red" }}>Pas de réponse!</p>
        </td>
      </tr>
    );

  return (
    <Fragment>
      {decision}

      <hr />
      <p>Les réponses aux questions:</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
