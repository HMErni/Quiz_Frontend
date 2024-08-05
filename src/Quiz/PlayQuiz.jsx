import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetQuizbyIdQuery } from './QuizAPI';
import { useSelector } from 'react-redux';

// Utility function to shuffle an array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function PlayQuiz() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: quizData, error, isLoading } = useGetQuizbyIdQuery(id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const { results, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (quizData) {
      const currentQuestion = quizData.quizItems[currentQuestionIndex];
      const choices = [
        ...currentQuestion.answers,
        currentQuestion.correctAnswer,
      ];
      setShuffledChoices(shuffleArray(choices));
    }
  }, [quizData, currentQuestionIndex]);

  const handleBack = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore((score) => score + 1);
      }
      setSelectedAnswer(null);

      if (currentQuestionIndex < quizData.quizItems.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const result = results.find(
          (result) => result.quizListId === quizData.id || null,
        );

        if (result) {
          console.log('Result Found', score);
        } else {
          console.log('No result found', score);
        }

        navigate('score');
      }
    } else {
      alert('Please select an answer');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading quiz</p>;

  const currentQuestion = quizData.quizItems[currentQuestionIndex];

  return (
    <div className="mx-5">
      <button
        className="mt-10 min-w-24 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950"
        onClick={handleBack}
      >
        Back
      </button>
      <div className="mt-10 flex flex-col rounded-lg border-2 border-fuchsia-700 p-5">
        <p className="text-lg">{currentQuestion.question}</p>
        <div className="mt-5 flex flex-col flex-wrap gap-5 md:flex-row md:justify-center">
          {shuffledChoices.map((choice, index) => (
            <button
              key={index}
              className="min-w-fit rounded border-2 border-fuchsia-700 px-4 py-2 hover:bg-fuchsia-700 hover:text-white focus:bg-fuchsia-800 focus:text-white md:min-w-[40%]"
              onClick={() => {
                setSelectedAnswer(choice);
              }}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col items-end gap-2">
        <p className="text-lg">
          {currentQuestionIndex + 1}/{quizData.quizItems.length}
        </p>
      </div>
      <div className="w-full rounded-lg bg-gray-200 p-1">
        <div
          className="w-full rounded-lg bg-fuchsia-700 p-1"
          style={{
            width: `${((currentQuestionIndex + 1) / quizData.quizItems.length) * 100}%`,
          }}
        ></div>
      </div>
      <div className="mt-5 flex flex-col items-end">
        <button
          className="min-w-24 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950"
          onClick={handleNext}
        >
          {currentQuestionIndex < quizData.quizItems.length - 1
            ? 'Next'
            : 'Submit'}
        </button>
      </div>
    </div>
  );
}

export default PlayQuiz;
