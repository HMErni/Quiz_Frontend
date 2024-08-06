import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetQuizbyIdQuery } from './QuizAPI';
import { useSelector } from 'react-redux';
import {
  useCreateResultMutation,
  useGetResultsQuery,
  useUpdateResultMutation,
} from '../Auth/UserAPI';

// Utility function to shuffle an array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function PlayQuiz() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: quizData, error, isLoading } = useGetQuizbyIdQuery(id);
  const { data: results } = useGetResultsQuery();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  const { userId } = useSelector((state) => state.auth);

  const [createResult] = useCreateResultMutation();
  const [updateResult] = useUpdateResultMutation();

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

  const handleSubmit = (finalAnswers) => {
    let calculatedScore = 0;
    finalAnswers.forEach((answer, index) => {
      if (answer === quizData.quizItems[index].correctAnswer) {
        calculatedScore += 1;
      }
    });

    let result = results.find(
      (result) =>
        (result.quizListId === quizData.id && result.userId === userId) || null,
    );

    if (result) {
      console.log('Result Found', calculatedScore, result.id);

      const newResult = {
        score: calculatedScore,
      };

      updateResult({ id: result.id, result: newResult });
    } else {
      console.log('Result Not Found', calculatedScore);

      try {
        const newResult = {
          score: calculatedScore,
          quizListId: quizData.id,
          userId: userId,
        };
        createResult(newResult);
      } catch (error) {
        console.error('Error creating result', error);
      }
    }

    navigate('result', {
      state: {
        score: calculatedScore,
        totalQuestions: quizData.quizItems.length,
      },
    });
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null); // Reset selected answer
      if (currentQuestionIndex < quizData.quizItems.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleSubmit(newAnswers); // Pass the final answers to handleSubmit
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
              className={`min-w-fit rounded border-2 border-fuchsia-700 px-4 py-2 hover:bg-fuchsia-700 hover:text-white focus:bg-fuchsia-800 focus:text-white md:min-w-[40%] ${selectedAnswer === choice ? 'bg-fuchsia-800 text-white' : ''}`}
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
