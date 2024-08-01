// import { useNavigate } from 'react-router-dom';

// function CreateQuiz() {
//   const navigate = useNavigate();
//   return (
//     <div className="mx-5">
//       <button
//         className="mt-10 min-w-24 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950"
//         onClick={() => navigate('/dashboard')}
//       >
//         Back
//       </button>
//       <h1 className="mt-5 text-center text-4xl font-semibold">Create Quiz</h1>
//       <div className="mt-5 flex flex-col gap-2 rounded-lg border-2 border-fuchsia-700 p-5">
//         <p className="text-xl font-semibold">Question:</p>
//         <textarea className="min-h-56 border-2 border-stone-400 p-2 text-base" />
//         <div className="my-5 flex flex-col flex-wrap gap-5 md:flex-row md:justify-center">
//           <p className="min-w-fit rounded border-2 border-fuchsia-700 px-4 py-2 md:min-w-[40%]">
//             Choice 1
//           </p>
//         </div>
//         <div className="flex gap-5">
//           <input
//             type="text"
//             className="min-w-fit flex-grow rounded border-2 border-stone-400 p-2 text-base focus:outline-fuchsia-700"
//           />
//           <button className="min-w-fit rounded bg-fuchsia-800 px-4 py-2 text-center font-bold text-white hover:bg-fuchsia-950">
//             Add Choice
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateQuiz;

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here, e.g., send the data to an API
  };

  return (
    <div className="mx-5">
      <button
        className="mt-10 min-w-24 rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-950"
        onClick={() => navigate('/dashboard')}
      >
        Back
      </button>
      <h1 className="mt-5 text-center text-4xl font-semibold">Create Quiz</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-2 rounded-lg border-2 border-fuchsia-700 p-5"
      >
        <p className="text-xl font-semibold">Question:</p>
        <textarea
          className="min-h-56 border-2 border-stone-400 p-2 text-base"
          {...register('question', { required: 'Question is required' })}
        />
        {errors.question && (
          <p className="text-red-500">{errors.question.message}</p>
        )}

        <div className="my-5 flex flex-col flex-wrap gap-5 md:flex-row md:justify-center">
          {fields.map((choice, index) => (
            <div
              key={choice.id}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                className="min-w-fit flex-grow rounded border-2 border-stone-400 p-2 text-base focus:outline-fuchsia-700"
                placeholder={`Choice ${index + 1}`}
                {...register(`choices.${index}.value`, {
                  required: 'Choice is required',
                })}
              />
              <button
                type="button"
                className="min-w-fit rounded bg-red-600 px-4 py-2 text-center font-bold text-white hover:bg-red-800"
                onClick={() => remove(index)}
              >
                Remove
              </button>
              {errors.choices && errors.choices[index] && (
                <p className="text-red-500">
                  {errors.choices[index].value.message}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-5">
          <button
            type="button"
            className="min-w-fit rounded bg-fuchsia-800 px-4 py-2 text-center font-bold text-white hover:bg-fuchsia-950"
            onClick={() => append({ value: '' })}
          >
            Add Choice
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <label
            htmlFor="correctAnswer"
            className="text-lg font-semibold"
          >
            Correct Answer:
          </label>
          <input
            type="text"
            id="correctAnswer"
            className="flex-grow rounded border-2 border-stone-400 p-2 text-base focus:outline-fuchsia-700"
            {...register('correctAnswer', {
              required: 'Correct Answer is required',
            })}
          />
          {errors.correctAnswer && (
            <p className="text-red-500">{errors.correctAnswer.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-5 min-w-fit rounded bg-fuchsia-800 px-4 py-2 text-center font-bold text-white hover:bg-fuchsia-950"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
