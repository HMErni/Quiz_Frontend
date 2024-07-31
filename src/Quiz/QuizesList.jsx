import { useState } from 'react';
import QuizItem from './QuizItem';
import { useEffect } from 'react';

function QuizesList() {
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5270/QuizList')
      .then((res) => res.json())
      .then((data) => setQuizes(data));
  }, []);

  console.log(quizes);

  return (
    <div className="mt-7 h-dvh">
      {quizes.map((quiz) => (
        <QuizItem
          key={quiz.id}
          quiz={quiz}
        />
      ))}
    </div>
  );
}

export default QuizesList;
