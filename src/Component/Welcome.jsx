import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const { userName, role } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  return (
    <div className="mt-10 flex justify-between px-5">
      <h1 className="text-4xl font-semibold">Hello {userName}!</h1>
      {role === 'admin' && (
        <button
          className="hover:bg-fuchsia-950sss min-w-14 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white"
          onClick={() => navigate('/createQuiz')}
        >
          +
        </button>
      )}
    </div>
  );
}

export default Welcome;
