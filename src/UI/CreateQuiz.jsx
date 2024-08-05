import { useForm } from 'react-hook-form';
import AddQuizItemModal from '../Quiz/QuizItemModal/QuizItemModal';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateQuizMutation,
  useGetQuizbyIdQuery,
  useUpdateQuizMutation,
} from '../Quiz/QuizAPI';

function QuizForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizItems, setQuizItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const { data: quizData, isLoading } = useGetQuizbyIdQuery(id, {
    skip: !id, // Skip the query if no ID is provided (i.e., in add mode)
  });

  const [createQuiz] = useCreateQuizMutation();

  const [updateQuiz] = useUpdateQuizMutation();

  useEffect(() => {
    if (quizData) {
      setValue('quizName', quizData.quizName);
      setValue('description', quizData.description);
      setQuizItems(quizData.quizItems);
    }
  }, [quizData, setValue]);

  const onSubmit = (data) => {
    const formattedData = {
      quizName: data.quizName,
      description: data.description,
      quizItems: quizItems.map((item) => ({
        question: item.question,
        correctAnswer: item.correctAnswer,
        answers: item.answers,
      })),
    };

    if (!quizData) {
      createQuiz(formattedData);
      navigate(`/dashboard`);
    } else {
      updateQuiz({ id: quizData.id, quiz: formattedData });
      navigate(`/dashboard`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddQuizItem = (item) => {
    if (editItem !== null) {
      const updatedItems = quizItems.map((quizItem, index) =>
        index === editItem ? item : quizItem,
      );
      setQuizItems(updatedItems);
      setEditItem(null);
    } else {
      setQuizItems([...quizItems, item]);
    }
    setIsModalOpen(false);
  };

  const handleEditQuizItem = (index) => {
    setEditItem(index);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mt-10 max-w-md px-4">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="focus:shadow-outline min-w-[120px] rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-900 focus:outline-none"
        >
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="quizName"
            className="mb-2 block font-bold text-gray-700"
          >
            Quiz Name
          </label>
          <input
            id="quizName"
            className={`border ${errors.quizName ? 'border-red-500' : 'border-gray-300'} focus:shadow-outline w-full rounded px-3 py-2 leading-tight text-gray-700 focus:outline-none`}
            {...register('quizName', { required: true })}
          />
          {errors.quizName && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block font-bold text-gray-700"
          >
            Description
          </label>
          <input
            id="description"
            className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:shadow-outline w-full rounded px-3 py-2 leading-tight text-gray-700 focus:outline-none`}
            {...register('description', { required: true })}
          />
          {errors.description && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="focus:shadow-outline w-full rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-900 focus:outline-none"
          >
            Add Quiz Items
          </button>
        </div>

        {quizItems.length > 0 && (
          <div className="mb-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="w-3/4 border-b px-4 py-2">Question</th>
                  <th className="w-1/4 border-b px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {quizItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b px-4 py-2">{item.question}</td>
                    <td className="border-b px-4 py-2">
                      <button
                        type="button"
                        onClick={() => handleEditQuizItem(index)}
                        className="mr-2 text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setQuizItems(quizItems.filter((_, i) => i !== index))
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="submit"
          className="focus:shadow-outline w-full rounded bg-fuchsia-800 px-4 py-2 font-bold text-white hover:bg-fuchsia-900 focus:outline-none"
        >
          Submit
        </button>
      </form>

      {isModalOpen && (
        <AddQuizItemModal
          onClose={() => {
            setIsModalOpen(false);
            setEditItem(null);
          }}
          onAdd={handleAddQuizItem}
          initialData={editItem !== null ? quizItems[editItem] : {}}
          mode={editItem !== null ? 'edit' : 'add'}
        />
      )}
    </div>
  );
}

export default QuizForm;
