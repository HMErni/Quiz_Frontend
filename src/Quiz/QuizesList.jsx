import QuizItem from './QuizItem';
import { useSelector } from 'react-redux';
import Welcome from '../Component/Welcome';
import { useGetQuizesQuery } from './QuizAPI';
import { useGetResultsQuery } from '../Login/UserAPI';

function QuizesList() {
  const {
    data: Quizes,
    isLoading: isQuizesLoading,
    isError: isQuizesError,
    isSuccess: isQuizesSuccess,
  } = useGetQuizesQuery();
  const {
    data: results,
    isLoading: isResultsLoading,
    isError: isResultsError,
    isSuccess: isResultsSuccess,
  } = useGetResultsQuery();

  const { userId } = useSelector((state) => state.auth);

  return (
    <div className="mt-7 h-dvh">
      <Welcome />
      {(isQuizesLoading || isResultsLoading) && <p>Loading...</p>}
      {(isQuizesError || isResultsError) && <p>Error</p>}
      {isQuizesSuccess &&
        isResultsSuccess &&
        Quizes.map((quiz) => {
          const matchingResult =
            results.find(
              (result) =>
                result.quizListId === quiz.id && result.userId === userId,
            ) || null;
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
