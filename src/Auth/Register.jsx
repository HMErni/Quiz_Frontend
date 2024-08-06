import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from './UserAPI';
import { useEffect } from 'react';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [registerUser, { isLoading, isError, isSuccess, error }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await registerUser({ ...data, role: 'user' });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [isSuccess, navigate]);

  // Watch the password field
  const password = watch('password');

  return (
    <div className="flex h-screen content-center items-center justify-center">
      <div className="flex min-h-48 min-w-60 flex-col rounded-md border-2 border-fuchsia-700 p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <h1 className="text-2xl font-semibold">Register</h1>
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

            <input
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              placeholder="Confirm Password"
              type="password"
              className="rounded border-2 border-stone-400 p-2 focus:outline-fuchsia-700"
              disabled={isLoading}
            />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </div>
          <button
            className="rounded-md bg-fuchsia-700 px-5 py-2 text-white hover:bg-fuchsia-900"
            disabled={isLoading}
          >
            Register
          </button>
          {isError && (
            <p className="text-center text-red-500">
              {error.status === 409
                ? 'Username already exists. '
                : 'Registration Failed. Please try again.'}
            </p>
          )}
          {isSuccess && (
            <p className="text-center text-green-700">
              Registration Successful. Redirecting to Login Page.
            </p>
          )}

          <div className="flex-colitems-center flex gap-1">
            <span>Already have an account? </span>
            <Link to={'/'}>
              <p className="text-fuchsia-700 hover:underline">Login Here</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
