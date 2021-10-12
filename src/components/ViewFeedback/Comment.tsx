import format from 'date-fns/format';
import isThisYear from 'date-fns/isThisYear';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';
import { RequestReturnType } from 'src/data/useRequest';
import useUser from 'src/data/useUser';
import supabase from 'src/utils/supabase';
import { mutate } from 'swr';
import Spinner from '../primitives/Spinner';
import TextArea from '../primitives/TextArea';
import Reply from './Reply';

export default function Comment({ comment }: { comment: RequestReturnType['comments'][0] }) {
  const [showForm, toggleForm] = React.useState(false);
  const [reply, setReply] = React.useState('');
  const [isSubmitting, setSubmitting] = React.useState(false);

  const replyButtonRef = useRef<HTMLButtonElement>(null);

  const user = useUser();

  const openReplyForm = () => toggleForm(true);
  const closeReplyForm = () => {
    toggleForm(false);
    // this gives react time to re-render and mount the button, otherwise it'll be null
    setTimeout(() => replyButtonRef.current?.focus(), 10);
  };

  async function addComment() {
    try {
      setSubmitting(true);
      const { error } = await supabase.from('replies').insert([
        {
          comment_id: comment.id,
          user_id: user?.id,
          content: reply,
        },
      ]);
      if (error) throw new Error('Could not add comment, please try again');
      setReply('');
      toggleForm(false);
      toast.success('Comment added successfully');
      mutate(comment.request_id); // reload list of comments
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
          height={36}
          width={36}
          className="rounded-full overflow-hidden"
          aria-hidden //
        />
        <div className="ml-2">
          <div className="flex space-x-2">
            <p className="text-small font-bold">{comment.user.name}</p>
            {comment.created_at && (
              <p
                className="text-small text-light"
                title={format(new Date(comment.created_at), 'EEEE, d LLLL yyyy, HH:mm:ss')}
              >
                {format(new Date(comment.created_at), 'LLL dd')}
                {!isThisYear(new Date(comment.created_at)) &&
                  ` '${new Date(comment.created_at).getFullYear().toString().slice(2)}`}
              </p>
            )}
          </div>
          <p className="text-small text-light">@{comment.user.username}</p>
        </div>
      </div>

      <p className="mt-4 text-light text-small md:text-regular">{comment.content}</p>

      {showForm ? (
        <form
          className="mt-6 bg-white rounded"
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
        >
          <TextArea
            id={`reply-to-${comment.id}`}
            autoFocus
            className="mt-0"
            value={reply}
            onChange={(e) => setReply(e.currentTarget.value)}
            disabled={isSubmitting}
          />
          <span className="text-light text-small">{250 - reply.length} Characters left</span>
          <div className="mt-2 flex space-x-2">
            <button className="btn primary" disabled={reply.length === 0 || isSubmitting}>
              {isSubmitting ? <Spinner className="text-2xl" /> : 'Post Reply'}
            </button>
            <button
              className="btn secondary"
              type="button"
              disabled={isSubmitting}
              onClick={closeReplyForm}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="text-alternate text-small font-medium mt-4"
          onClick={openReplyForm}
          ref={replyButtonRef}
        >
          {showForm ? 'Cancel' : 'Reply'}
        </button>
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
