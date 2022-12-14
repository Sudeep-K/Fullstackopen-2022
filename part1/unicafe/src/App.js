import { useState } from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import Statistics from "./components/Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGoodReview = () => {
    setAll(all + 1);
    setGood(good + 1);
  }

  const handleNeutralReview = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  }

  const handleBadReview = () => {
    setAll(all + 1);
    setBad(bad + 1);
  }

  const checkRender = () => {
    if (all !== 0) {
      return (
        <>
          <table>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
            <tr>
              <Display text={'good'} count={good} />
            </tr>
            <tr>
              <Display text={'neutral'} count={neutral} />
            </tr>
            <tr>
              <Display text={'bad'} count={bad} />
            </tr>
            <tr>
              <Display text={'all'} count={all} />
            </tr>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} />
          </table>
        </>
      )
    }
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodReview} text={'good'} />
      <Button onClick={handleNeutralReview} text={'neutral'} />
      <Button onClick={handleBadReview} text={'bad'} />
      <h1>statistics</h1>
      {checkRender()}
    </>
  );
}

export default App;
