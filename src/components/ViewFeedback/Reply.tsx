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
