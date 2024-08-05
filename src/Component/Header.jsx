import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleHome = () => {
    navigate('/dashboard', { replace: true });
  };
  return (
    <header className="flex items-center justify-between bg-fuchsia-900 p-4 text-white sm:p-5">
      <div className="flex items-center">
        <button
          className="ml-2 text-xl font-bold"
          onClick={handleHome}
        >
          Quiz App
        </button>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
