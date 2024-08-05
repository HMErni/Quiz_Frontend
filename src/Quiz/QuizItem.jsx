import { useSelector } from 'react-redux';
import { useDeleteQuizMutation } from './QuizAPI';
import { useNavigate } from 'react-router-dom';

function QuizItem({ quiz, result }) {
  const { role } = useSelector((state) => state.auth);
  const { id, quizItems } = quiz;
  const [deleteQuiz] = useDeleteQuizMutation();
  const navigate = useNavigate();

  const handleDeleteQuiz = (quizId) => {
    try {
      if (confirm('Are you sure you want to delete this quiz?')) {
        deleteQuiz(quizId);
      }
    } catch (error) {
      alert("Can't delete quiz", error);
    }
  };

  const handleEditQuiz = (quizId) => {
    navigate(`editQuiz/${quizId}`);
  };

  const handleStartQuiz = (quizId) => {
    navigate(`/playQuiz/${quizId}`, { replace: true });
  };

  return (
    <div className="mx-5 mt-5 flex min-h-80 flex-col rounded-lg border-2 border-fuchsia-700 p-5">
      {role === 'admin' && (
        <div className="mb-3 space-x-2 text-right">
          <button
            className="min-w-20 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950"
            onClick={() => handleEditQuiz(id)}
          >
            Edit
          </button>
          <button
            className="min-w-20 rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-800"
            onClick={() => handleDeleteQuiz(id)}
          >
            Delete
          </button>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{quiz.quizName}</h2>
        <div className="text-right">
          {result && <p className="font-semibold">Score: {result.score}</p>}
          <p className="font-semibold">Questions: {quizItems.length}</p>
        </div>
      </div>
      <div className="mt-5 min-h-max flex-grow justify-between">
        <span className="font-semibold">Description: </span>
        <p>{quiz.description}</p>
      </div>
      <button
        className="mt-5 w-full flex-none rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950"
        onClick={() => handleStartQuiz(id)}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default QuizItem;
