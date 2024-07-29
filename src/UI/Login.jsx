import React from 'react';

function Login() {
  return (
    <div className="flex min-h-48 min-w-60 flex-col rounded-md border-2 border-fuchsia-700 p-5">
      <form
        action=""
        className="flex flex-col gap-5"
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="rounded border-2 border-stone-400 p-2"
        />
        <button className="rounded-md bg-fuchsia-700 px-5 py-2 text-white hover:bg-fuchsia-900">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
