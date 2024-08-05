import QuizItem from './QuizItem';
import { useSelector } from 'react-redux';
import Welcome from '../Component/Welcome';
import { useGetQuizesQuery } from './QuizAPI';

function QuizesList() {
  const { data: Quizes, isLoading, isError, isSuccess } = useGetQuizesQuery();

  const { results } = useSelector((state) => state.auth);

  return (
    <div className="mt-7 h-dvh">
      <Welcome />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {isSuccess &&
        Quizes.map((quiz) => {
          const matchingResult =
            results.find((result) => result.quizListId === quiz.id) || null;
          return (
            <QuizItem
              key={quiz.id}
              quiz={quiz}
              result={matchingResult}
            />
          );
        })}
    </div>
  );
}

export default QuizesList;
