import { useState } from 'react';
import Header from './components/Header'
import Total from './components/Total'
import Content from './components/Content'

function App() {
  const [course, setCourse] = useState('Half Stack application development')
  const [part1, setPart1] = useState('Fundamentals of React')
  const [exercises1, setExercises1] = useState(10);
  const [part2, setPart2] = useState('Using props to pass data')
  const [exercises2, setExercises2] = useState(7);
  const [part3, setPart3] = useState('State of a component')
  const [exercises3, setExercises3] = useState(14);

  return (
    <>
      <Header course={course} />
      <Content 
      part1={part1}
      exercises1={exercises1} 
      part2={part2}
      exercises2={exercises2}
      part3={part3}
      exercises3={exercises3}
      />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </>
  );
}

export default App;
