import * as React from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import useComments, { CommentsReturnType } from 'src/data/useComments';
import { RequestReturnType } from 'src/data/useRequests';
import supabase from 'src/utils/supabase';
import { mutate } from 'swr';
import AngleLeft from '../../icons/AngleLeft';
import Spinner from '../primitives/Spinner';
import TextArea from '../primitives/TextArea';
import RequestCard from '../RequestCard';
import './index.css';
import classes from './index.module.css';

export default function ViewFeedback(props: { feedback: RequestReturnType }) {
  const history = useHistory();
  const { data: comments } = useComments(props.feedback.id);
  const [comment, setComment] = React.useState('');
  const [isSubmitting, setSubmitting] = React.useState(false);

  async function addComment() {
    try {
      setSubmitting(true);
      const { error } = await supabase.from('comments').insert([
        {
          request_id: props.feedback.id,
          user_id: supabase.auth.user()?.id,
          content: comment,
        },
      ]);
      if (error) throw new Error('Could not add comment, please try again');
      setComment('');
      toast.success('Comment added successfully');
      mutate([props.feedback.id, 'comments']); // reload list of comments
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

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
        <h3 className="text-lg font-bold">
          {props.feedback.comments_count?.[0].count ?? 0} Comment(s)
        </h3>

        <div className="mt-1 divide-y divide-light divide-opacity-25">
          {comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>

      <form
        className="mt-6 p-6 md:px-8 md:py-7 bg-white rounded"
        onSubmit={(e) => {
          e.preventDefault();
          addComment();
        }}
      >
        <h3 className="text-lg font-bold">Add Comment</h3>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          id="new-comment"
          className="mt-6"
          disabled={isSubmitting}
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-light">{250 - comment.length} Characters left</span>
          <button
            className="btn primary"
            type="submit"
            disabled={isSubmitting || comment.length === 0}
          >
            {isSubmitting ? <Spinner className="text-2xl" /> : 'Post Comment'}
          </button>
        </div>
      </form>
    </main>
  );
}

function Comment({ comment }: { comment: CommentsReturnType }) {
  const [showForm, toggleForm] = React.useState(false);
  const [reply, setReply] = React.useState('');
  const [isSubmitting, setSubmitting] = React.useState(false);

  async function addComment() {
    try {
      setSubmitting(true);
      const { error } = await supabase.from('replies').insert([
        {
          comment_id: comment.id,
          user_id: supabase.auth.user()?.id,
          content: reply,
        },
      ]);
      if (error) throw new Error('Could not add comment, please try again');
      setReply('');
      toggleForm(false);
      toast.success('Comment added successfully');
      mutate([comment.request_id, 'comments']); // reload list of comments
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="py-6">
      <div className="flex items-center">
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${comment.user_id}.svg`}
          height={40}
          width={40}
          className="rounded-full overflow-hidden"
          aria-hidden //
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
        <form
          className="mt-6 mobile:space-y-6 md:flex md:space-x-6 bg-white rounded"
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <div className="flex-grow">
            <TextArea
              id={`reply-to-${comment.id}`}
              autoFocus
              className="mt-0"
              value={reply}
              onChange={(e) => setReply(e.currentTarget.value)}
              disabled={isSubmitting}
            />
            <span className="text-light">{250 - reply.length} Characters left</span>
          </div>
          <button className="btn primary" disabled={reply.length === 0 || isSubmitting}>
            {isSubmitting ? <Spinner className="text-2xl" /> : 'Post Reply'}
          </button>
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

function Reply({ reply }: { reply: CommentsReturnType['replies'][0] }) {
  return (
    <div className="pl-6 reply">
      <div className="flex items-center">
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${reply.user_id}.svg`}
          height={40}
          width={40}
          className="rounded-full overflow-hidden"
          aria-hidden
        />
        <div className="ml-4">
          <p className="text-small font-bold">{reply.user?.name}</p>
          <p className="text-small text-light">@{reply.user?.username}</p>
        </div>
      </div>

      <p className="mt-4 text-light text-small md:text-regular">{reply.content}</p>
    </div>
  );
}
