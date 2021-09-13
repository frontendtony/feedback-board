import * as React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import supabase from 'src/utils/supabase';
import AngleLeft from '../../icons/AngleLeft';
import Edit from '../../icons/Edit';
import Plus from '../../icons/Plus';
import Select from '../primitives/Select';
import Spinner from '../primitives/Spinner';
import TextArea from '../primitives/TextArea';
import TextInput from '../primitives/TextInput';
import classes from './index.module.css';

type FormValues = { title: string; category: string; status: string; description: string };

const categories = [
  { label: 'Feature', value: 'feature' },
  { label: 'Bug', value: 'bug' },
  { label: 'Enhancement', value: 'enhancement' },
  { label: 'UI', value: 'ui' },
  { label: 'UX', value: 'ux' },
];
const statuses = [
  { label: 'Suggestion', value: 'suggestion' },
  { label: 'Planned', value: 'planned' },
  { label: 'In-Progess', value: 'in-progess' },
  { label: 'Live', value: 'live' },
];

export default function CreateFeedback({ feedback }: { feedback?: App.Request }) {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [category, setCategory] = React.useState(() =>
    feedback
      ? categories.find(({ value }) => value === feedback.category) ?? categories[0]
      : categories[0]
  );
  const [status, setStatus] = React.useState(() =>
    feedback ? statuses.find(({ value }) => value === feedback.status) ?? statuses[0] : statuses[0]
  );

  async function createRequest({ title, description }: FormValues) {
    try {
      const { error } = await supabase.from('requests').insert(
        [
          {
            title,
            description,
            category: category.value,
            user_id: supabase.auth.user()?.id,
          },
        ],
        { returning: 'minimal' }
      );
      if (error) throw new Error(error.message);
      toast.success('Feedback submitted');
      history.push('/');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <main className={`page-container px-6 py-8 md:py-14 ${classes.pageContainer}`}>
      <button onClick={history.goBack} className="flex items-center space-x-4">
        <AngleLeft className="text-alternate" />
        <span className="font-bold text-small text-light">Go Back</span>
      </button>

      <form
        className="mt-14 md:mt-16 p-6 md:p-10 bg-white rounded relative w-full"
        onSubmit={handleSubmit(createRequest)}
      >
        <div
          className={`h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center absolute top-0 -translate-y-1/2 ${classes.decorativeIcon} bg-primary`}
          aria-hidden
        >
          {feedback ? (
            <Edit className="text-white md:text-2xl" />
          ) : (
            <Plus className="text-white mobile:text-small" />
          )}
        </div>

        <h1 className="text-lg font-bold mt-6">
          {feedback ? `Editing '${feedback.title}'` : 'Create New Feedback'}
        </h1>
        <div className="mt-10 space-y-8">
          <TextInput
            label="Feedback Title"
            hint="Add a short, descriptive headline"
            isInvalid={!!errors.title}
            validationMessage={errors.title?.message}
            inputProps={{
              ...register('title', {
                required: 'Title is required',
                min: { value: 2, message: 'Enter at least 2 characters' },
                maxLength: { value: 100, message: 'Title too long (100 max)' },
              }),
              id: 'title',
            }}
          />
          <Select
            value={category}
            onChange={setCategory}
            options={categories}
            label="Category"
            hint="Choose a category for your feedback"
            id="feedback-category"
          />
          {feedback && (
            <Select
              value={status}
              onChange={setStatus}
              options={statuses}
              label="Category"
              hint="Choose a category for your feedback"
              id="feedback-category"
            />
          )}
          <TextArea
            label="Feedback Detail"
            hint="Include any specific comments on what should be improved, added, etc."
            id="description"
            inputProps={{
              ...register('description', {
                required: 'Description is required',
                min: { value: 2, message: 'Enter at least 2 characters' },
                maxLength: { value: 250, message: 'Description too long (250 max)' },
              }),
              rows: 3,
            }}
            isInvalid={!!errors.description}
            validationMessage={errors.description?.message}
          />
        </div>

        <div className="flex space-x-4 mobile:space-x-2 justify-between mt-8">
          {feedback && (
            <button className="btn danger" type="button">
              Delete
            </button>
          )}
          <div className="flex space-x-4 mobile:space-x-2 ml-auto">
            <button className="btn secondary" type="button" onClick={history.goBack}>
              Cancel
            </button>
            <button className="btn primary" type="submit">
              {isSubmitting ? (
                <Spinner className="text-2xl" />
              ) : feedback ? (
                <>
                  Save<span className="mobile:hidden"> Changes</span>
                </>
              ) : (
                'Add Feedback'
              )}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
