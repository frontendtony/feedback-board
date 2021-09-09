import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AngleLeft from '../../icons/AngleLeft';
import TextArea from '../primitives/TextArea';
import RequestCard from '../RequestCard';
import './index.css';
import classes from './index.module.css';

export default function ViewFeedback(props: { feedback: App.Request }) {
  const history = useHistory();
  const [comment, setComment] = React.useState('');

  return (
    <main className={`page-container px-6 py-8 md:py-14 ${classes.pageContainer}`}>
      <div className="flex items-center justify-between">
        <button onClick={history.goBack} className="flex items-center space-x-4">
          <AngleLeft className="text-alternate" />
          <span className="font-bold text-small text-light">Go Back</span>
        </button>
        <button
          onClick={() =>
            history.push({ pathname: `/${props.feedback.id}/edit`, state: props.feedback })
          }
          className="btn alternate"
        >
          Edit Feedback
        </button>
      </div>

      <div className="mt-6 md:px-2 md:py-1 bg-white rounded">
        <RequestCard request={props.feedback} />
      </div>

      <div className="mt-6 p-6 md:px-8 md:py-7 bg-white rounded">
        <h3 className="text-lg font-bold">{props.feedback.comments?.length ?? 0} Comment(s)</h3>

        <div className="mt-1 divide-y divide-light divide-opacity-25">
          {props.feedback.comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>

      <form className="mt-6 p-6 md:px-8 md:py-7 bg-white rounded">
        <h3 className="text-lg font-bold">Add Comment</h3>
        <TextArea
          inputProps={{ className: 'mt-6' }}
          id="new-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-light">{250 - comment.length} Characters left</span>
          <button className="btn primary">Post Comment</button>
        </div>
      </form>
    </main>
  );
}

function Comment({ comment }: { comment: App.Comment }) {
  const [showForm, toggleForm] = React.useState(false);
  const [reply, setReply] = React.useState('');

  return (
    <div className="py-6">
      <div className="flex items-center">
        <img
          // the image string includes a dot(.) which messes with the url
          src={comment.user.image.substring(1)}
          height={40}
          width={40}
          alt={comment.user.name}
          className="rounded-full overflow-hidden"
        />
        <div className="ml-4">
          <p className="text-small font-bold">{comment.user.name}</p>
          <p className="text-small text-light">@{comment.user.username}</p>
        </div>
        <button
          className="ml-auto text-alternate text-small font-semibold"
          onClick={() => toggleForm((state) => !state)}
        >
          Reply
        </button>
      </div>

      <p className="mt-4 text-light text-small md:text-regular">{comment.content}</p>

      {showForm && (
        <form className="mt-6 mobile:space-y-6 md:flex md:space-x-6 bg-white rounded">
          <div className="flex-grow">
            <TextArea
              inputProps={{ autoFocus: true, className: 'mt-0' }}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <span className="text-light">{250 - reply.length} Characters left</span>
          </div>
          <button className="btn primary">Post Reply</button>
        </form>
      )}

      {comment.replies && (
        <div className="space-y-6 mt-6">
          {comment.replies.map((reply) => (
            <Reply reply={reply} key={reply.content} />
          ))}
        </div>
      )}
    </div>
  );
}

function Reply({ reply }: { reply: App.Reply }) {
  const [showForm, toggleForm] = React.useState(false);
  const [comment, setComment] = React.useState('');

  return (
    <div className="pl-6 reply">
      <div className="flex items-center">
        <img
          // the image string includes a dot(.) which messes with the url
          src={reply.user.image.substring(1)}
          height={40}
          width={40}
          alt={reply.user.name}
          className="rounded-full overflow-hidden"
        />
        <div className="ml-4">
          <p className="text-small font-bold">{reply.user.name}</p>
          <p className="text-small text-light">@{reply.user.username}</p>
        </div>
        <button
          className="ml-auto text-alternate text-small font-semibold"
          onClick={() => toggleForm((state) => !state)}
        >
          Reply
        </button>
      </div>

      <p className="mt-4 text-light text-small md:text-regular">{reply.content}</p>

      {showForm && (
        <form className="mt-6 mobile:space-y-6 md:flex md:space-x-6 bg-white rounded">
          <div className="flex-grow">
            <TextArea
              inputProps={{ autoFocus: true, className: 'mt-0' }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <span className="text-light">{250 - comment.length} Characters left</span>
          </div>
          <button className="btn primary">Post Reply</button>
        </form>
      )}
    </div>
  );
}
