import * as React from 'react';
import AngleUp from '../icons/AngleUp';
import CommentBubble from '../icons/CommentBubble';

export default function RequestCard({ request }: { request: App.Request }) {
  return (
    <div
      key={request.id}
      className="rounded p-6 bg-white md:grid grid-cols-3 gap-10"
      style={{ gridTemplateColumns: 'auto 1fr auto' }}
    >
      <div className="hidden md:block">
        <Upvotes count={request.upvotes} direction="vertical" />
      </div>
      <div>
        <h3 className="font-bold">{request.title}</h3>
        <p className="mt-2 text-light text-small">{request.description}</p>
        <div className="request-label mt-3">{request.category}</div>
      </div>

      <div className="flex items-center justify-between mt-4 md:hidden">
        <Upvotes count={request.upvotes} />
        <CommentCount count={request.comments?.length ?? 0} />
      </div>
      <div className="hidden md:block ml-auto self-center">
        <CommentCount count={request.comments?.length ?? 0} />
      </div>
    </div>
  );
}

function Upvotes(props: { count: number; direction?: 'vertical' | 'horizontal' }) {
  return (
    <button
      className={`rounded bg-alternate-light flex items-center min-w-[4.1ch] ${
        props.direction === 'vertical'
          ? 'flex-col space-y-1 py-2 px-2'
          : 'flex-row space-x-[.625rem] px-4 py-[0.375rem]'
      }`}
    >
      <AngleUp className="text-[.5rem] text-alternate" />
      <span className="font-bold text-small">
        {props.count} <span className="sr-only">upvotes</span>
      </span>
    </button>
  );
}

function CommentCount(props: { count: number }) {
  return (
    <button className="flex items-center space-x-2">
      <CommentBubble className="text-[#CDD2EE]" />
      <span className="font-bold text-small">
        {props.count} <span className="sr-only">comments</span>
      </span>
    </button>
  );
}
