function PlayQuiz() {
  return (
    <div className="mx-5">
      <button className="mt-10 min-w-24 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950">
        Back
      </button>
      <div className="mt-10 flex flex-col rounded-lg border-2 border-fuchsia-700 p-5">
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          massa erat, vehicula at pharetra nec, aliquam quis nulla. Donec porta.
        </p>
        <div className="mt-5 flex flex-col flex-wrap gap-5 md:flex-row md:justify-center">
          <button className="min-w-fit rounded border-2 border-fuchsia-700 px-4 py-2 hover:bg-fuchsia-700 hover:text-white md:min-w-[40%]">
            Choice 1
          </button>
          <button className="min-w-fit rounded border-2 border-fuchsia-700 px-4 py-2 hover:bg-fuchsia-700 hover:text-white md:min-w-[40%]">
            Choice 2
          </button>
          <button className="min-w-fit rounded border-2 border-fuchsia-700 px-4 py-2 hover:bg-fuchsia-700 hover:text-white md:min-w-[40%]">
            Choice 3
          </button>
          <button className="min-w-fit rounded border-2 border-fuchsia-700 px-4 py-2 hover:bg-fuchsia-700 hover:text-white md:min-w-[40%]">
            Choice 4
          </button>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-end gap-2">
        <p className="text-lg"> 1/10</p>
      </div>
      <progress
        className="min-w-full rounded-lg bg-fuchsia-700 p-2"
        value={1}
        max={10}
      />
      <div className="mt-5 flex flex-col items-end">
        <button className="min-w-24 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950">
          Next
        </button>
      </div>
    </div>
  );
}

export default PlayQuiz;
