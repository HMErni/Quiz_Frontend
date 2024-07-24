function QuizItem() {
  return (
    <div className="mx-5 mt-5 flex min-h-80 flex-col rounded-lg border-2 border-fuchsia-700 p-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Quiz Title</h2>
        <div className="flex gap-2">
          <button className="min-w-20 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950">
            Edit
          </button>
          <button className="min-w-20 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950">
            Delete
          </button>
        </div>
      </div>
      <div className="mt-5 min-h-max flex-grow justify-between border-2 border-fuchsia-700"></div>
      <button className="mt-5 w-full flex-none rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950">
        Start Quiz
      </button>
    </div>
  );
}

export default QuizItem;
