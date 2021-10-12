import format from 'date-fns/format';
import isThisYear from 'date-fns/isThisYear';
import React from 'react';
import { RequestReturnType } from 'src/data/useRequest';

export default function Reply({
  reply,
}: {
  reply: RequestReturnType['comments'][0]['replies'][0];
}) {
  return (
    <div className="pl-6 reply">
      <div className="flex items-center">
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${reply.user_id}.svg`}
          height={36}
          width={36}
          className="rounded-full overflow-hidden"
          aria-hidden
        />
        <div className="ml-2">
          <div className="flex space-x-2">
            <p className="text-small font-bold">{reply.user?.name}</p>
            {reply.created_at && (
              <p
                className="text-small text-light"
                title={format(new Date(reply.created_at), 'EEEE, d LLLL yyyy, HH:mm:ss')}
              >
                {format(new Date(reply.created_at), 'LLL dd')}
                {!isThisYear(new Date(reply.created_at)) &&
                  ` '${new Date(reply.created_at).getFullYear().toString().slice(2)}`}
              </p>
            )}
          </div>
          <p className="text-small text-light">@{reply.user?.username}</p>
        </div>
      </div>

      <p className="mt-4 text-light text-small md:text-regular">{reply.content}</p>
    </div>
  );
}
