import * as React from 'react';
import { Link } from 'react-router-dom';
import AngleLeft from '../../icons/AngleLeft';
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

export default function CreateFeedback() {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState(categories[0]);

  return (
    <main className={`page-container px-6 py-8 md:py-14 ${classes.pageContainer}`}>
      <Link to="/" className="flex items-center space-x-4">
        <AngleLeft className="text-alternate" />
        <span className="font-bold text-small text-light">Go Back</span>
      </Link>

      <form className="mt-14 md:mt-16 p-6 md:p-10 bg-white rounded relative w-full">
        <div
          className={`h-10 w-10 md:w-14 md:h-14 rounded-full flex items-center justify-center absolute top-0 -translate-y-1/2 ${classes.decorativeIcon} bg-primary`}
          aria-hidden
        >
          <Plus className="text-white" />
        </div>

        <h1 className="text-lg font-bold mt-6">Create New Feedback</h1>
        <div className="mt-10 space-y-8">
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Feedback Title"
            hint="Add a short, descriptive headline"
            id="feedback-title"
          />
          <Select
            value={category}
            onChange={setCategory}
            options={categories}
            label="Category"
            hint="Choose a category for your feedback"
            id="feedback-category"
          />
          <TextArea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Feedback Detail"
            hint="Include any specific comments on what should be improved, added, etc."
            id="feedback-detail"
            inputProps={{ rows: 3 }}
          />
        </div>

        <div className="flex space-x-4 justify-end mt-8">
          <button className="btn secondary" type="button">
            Cancel
          </button>
          <button className="btn primary" type="submit">
            Add Feedback
          </button>
        </div>
      </form>
    </main>
  );
}
