import { useForm } from 'react-hook-form';
import { useNewLoginMutation } from './LoginAPI';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginAuth, logoutAuth } from './authSlice';

function Login() {
  const [login, { isLoading, isError, data: User, isSuccess }] =
    useNewLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (userData) => {
    await login(userData);
  };

  useEffect(() => {
    dispatch(logoutAuth());

    if (isSuccess) {
      dispatch(
        loginAuth({
          id: User.id,
          username: User.username,
          role: User.role,
          results: User.results,
        }),
      );
      navigate('/dashboard');
    }
  }, [isSuccess, navigate, User, dispatch]);

  return (
    <div className="flex h-screen content-center items-center justify-center">
      <div className="flex min-h-48 min-w-60 flex-col rounded-md border-2 border-fuchsia-700 p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <h1 className="text-2xl font-semibold">Login</h1>
          <div className="flex flex-col gap-2">
            <input
              {...register('username', { required: 'Username is required' })}
              placeholder="Username"
              className="rounded border-2 border-stone-400 p-2 focus:outline-fuchsia-700"
              disabled={isLoading}
            />
            <p className="text-red-500">{errors.username?.message}</p>
            <input
              {...register('password', { required: 'Password is required' })}
              placeholder="Password"
              type="password"
              className="rounded border-2 border-stone-400 p-2 focus:outline-fuchsia-700"
              disabled={isLoading}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <button
            className="rounded-md bg-fuchsia-700 px-5 py-2 text-white hover:bg-fuchsia-900"
            disabled={isLoading}
          >
            Login
          </button>
          {isError && (
            <p className="text-center text-red-500">
              Invalid Username or Password
            </p>
          )}
          <div className="flex flex-col items-center">
            <span>
              Dont Have an Account?{' '}
              <a
                href="/Login"
                className="text-fuchsia-700 hover:underline"
              >
                Register Here
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
