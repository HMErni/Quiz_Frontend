import Header from './Component/Header';
import QuizesList from './UI/QuizesList';
import Welcome from './Component/Welcome';
import Quiz from './UI/Quiz';
import Login from './UI/Login';

function App() {
  return (
    <>
      {/* <Header />
      <Welcome />
      <QuizesList />
      <Quiz /> */}
      <div className="flex h-screen content-center items-center justify-center">
        <Login />
      </div>
    </>
  );
}

export default App;
