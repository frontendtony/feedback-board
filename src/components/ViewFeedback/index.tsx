import * as React from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import useRequest from 'src/data/useRequest';
import useUser from 'src/data/useUser';
import supabase from 'src/utils/supabase';
import { mutate } from 'swr';
import AngleLeft from '../../icons/AngleLeft';
import Spinner from '../primitives/Spinner';
import TextArea from '../primitives/TextArea';
import Comment from './Comment';
import './index.css';
import classes from './index.module.css';
import RequestCard from './RequestCard';

export default function ViewFeedback() {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const user = useUser();

  const { data, loading } = useRequest(params.id);
  const [comment, setComment] = React.useState('');
  const [isSubmitting, setSubmitting] = React.useState(false);

  async function addComment() {
    try {
      setSubmitting(true);
      const { error } = await supabase.from('comments').insert([
        {
          request_id: data?.id,
          user_id: supabase.auth.user()?.id,
          content: comment,
        },
      ]);
      if (error) throw new Error('Could not add comment, please try again');
      setComment('');
      toast.success('Comment added successfully');
      mutate(`${data?.id}`); // reload list of comments
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={`page-container px-6 py-8 md:py-14 ${classes.pageContainer}`}>
      <Helmet>
        <title>{`${data?.title ?? 'Loading Feedback'}`} - Feedback Board</title>
      </Helmet>
      <div className="flex items-center justify-between">
        <button onClick={history.goBack} className="flex items-center space-x-4">
          <AngleLeft className="text-alternate" />
          <span className="font-bold text-small text-light">Go Back</span>
        </button>
        {data?.user_id === user?.id && (
          <button
            onClick={() => history.push({ pathname: `/${data?.id}/edit`, state: data })}
            className="btn alternate"
            disabled={!data}
          >
            Edit Feedback
          </button>
        )}
      </div>

      {loading ? (
        <Spinner className="text-6xl mx-auto mt-16" />
      ) : (
        data && (
          <>
            <div className="mt-6 md:px-2 md:py-1 bg-white rounded">
              <RequestCard request={data} />
            </div>

            <div className="mt-6 p-6 md:px-8 md:py-7 bg-white rounded">
              <h3 className="text-lg font-bold">{data?.comments.length} Comment(s)</h3>

              <div className="mt-1 divide-y divide-light divide-opacity-25">
                {data?.comments?.map((comment) => (
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
          </>
        )
      )}
    </main>
  );
}
