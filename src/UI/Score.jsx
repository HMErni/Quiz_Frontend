import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, totalQuestions } = location.state;

  const handleBack = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-fuchsia-800">
          Quiz Results
        </h2>
        <p className="mb-4 text-center text-xl text-gray-700">
          Your score:{' '}
          <span className="font-bold text-fuchsia-800">{score}</span> /{' '}
          {totalQuestions}
        </p>
        <div className="flex justify-center">
          <button
            className="mt-10 min-w-24 rounded bg-fuchsia-800 px-6 py-3 font-bold text-white transition duration-300 hover:bg-fuchsia-950"
            onClick={handleBack}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
