import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const AddQuizItemModal = ({
  onClose,
  onAdd,
  initialData = {},
  mode = 'add',
}) => {
  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: initialData,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  });

  const onSubmit = (data) => {
    onAdd(data);
    reset();
  };

  // Populate the form with initial data if in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, mode, setValue]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">
          {mode === 'edit' ? 'Edit Quiz Item' : 'Add Quiz Item'}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="question"
              className="mb-2 block font-bold text-gray-700"
            >
              Question
            </label>
            <input
              id="question"
              className="focus:shadow-outline w-full rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              {...register('question', { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="correctAnswer"
              className="mb-2 block font-bold text-gray-700"
            >
              Correct Answer
            </label>
            <input
              id="correctAnswer"
              className="focus:shadow-outline w-full rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:outline-none"
              {...register('correctAnswer', { required: true })}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold text-gray-700">
              Answers
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="mb-2 flex items-center"
              >
                <input
                  className="focus:shadow-outline w-full rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                  {...register(`answers.${index}`, { required: true })}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append('')}
              className="focus:shadow-outline rounded bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-800 focus:outline-none"
            >
              Add Answer
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="focus:shadow-outline mr-2 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-fuchsia-700 px-4 py-2 font-bold text-white hover:bg-fuchsia-800 focus:outline-none"
            >
              {mode === 'edit' ? 'Save Changes' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuizItemModal;
