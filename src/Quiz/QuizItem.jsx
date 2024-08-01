import { useSelector } from 'react-redux';
import { useDeleteQuizMutation } from './QuizAPI';

function QuizItem({ quiz }) {
  const { role } = useSelector((state) => state.auth);
  const { id, quizItems } = quiz;
  const [deleteQuiz] = useDeleteQuizMutation();

  function handleDeleteQuiz(quizId) {
    try {
      if (confirm('Are you sure you want to delete this quiz?')) {
        deleteQuiz(quizId);
      }
    } catch (error) {
      console.error("Can't delete quiz", error);
    }
  }

  console.log(quizItems);

  return (
    <div className="mx-5 mt-5 flex min-h-80 flex-col rounded-lg border-2 border-fuchsia-700 p-5">
      {role === 'admin' && (
        <div className="mb-3 flex gap-2">
          <button className="min-w-20 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950">
            Edit
          </button>
          <button
            className="hover:bg- fuchsia-950 min-w-20 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white"
            onClick={() => handleDeleteQuiz(id)}
          >
            Delete
          </button>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{quiz.quizName}</h2>
        <p className="font-semibold">Total Questions: {quizItems.length}</p>
      </div>
      <div className="mt-5 min-h-max flex-grow justify-between">
        <span className="font-semibold">Description: </span>
        <p>{quiz.description}</p>
      </div>
      <button className="mt-5 w-full flex-none rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950">
        Start Quiz
      </button>
    </div>
  );
}

export default QuizItem;
