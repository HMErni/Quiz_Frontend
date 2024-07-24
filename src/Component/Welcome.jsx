function Welcome() {
  return (
    <div className="mt-10 flex justify-between px-5">
      <h1 className="text-4xl font-semibold">Hello, {'{User Name}'}!</h1>
      <button className="hover:bg-fuchsia-950sss min-w-14 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white">
        +
      </button>
    </div>
  );
}

export default Welcome;
