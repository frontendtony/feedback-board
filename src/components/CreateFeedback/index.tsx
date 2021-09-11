import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AngleLeft from '../../icons/AngleLeft';
import Edit from '../../icons/Edit';
import Plus from '../../icons/Plus';
import Select from '../primitives/Select';
import TextArea from '../primitives/TextArea';
import TextInput from '../primitives/TextInput';
import classes from './index.module.css';

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

  const [description, setDescription] = React.useState(feedback?.title ?? '');
  const [category, setCategory] = React.useState(() =>
    feedback
      ? categories.find(({ value }) => value === feedback.category) ?? categories[0]
      : categories[0]
  );
  const [status, setStatus] = React.useState(() =>
    feedback ? statuses.find(({ value }) => value === feedback.status) ?? statuses[0] : statuses[0]
  );

  return (
    <main className={`page-container px-6 py-8 md:py-14 ${classes.pageContainer}`}>
      <button onClick={history.goBack} className="flex items-center space-x-4">
        <AngleLeft className="text-alternate" />
        <span className="font-bold text-small text-light">Go Back</span>
      </button>

      <form className="mt-14 md:mt-16 p-6 md:p-10 bg-white rounded relative w-full">
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
          <TextInput label="Feedback Title" hint="Add a short, descriptive headline" />
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Feedback Detail"
            hint="Include any specific comments on what should be improved, added, etc."
            id="feedback-detail"
            inputProps={{ rows: 3 }}
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
              {feedback ? (
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
