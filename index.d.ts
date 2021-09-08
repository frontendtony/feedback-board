declare namespace App {
  interface Request {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments?: Comment[];
  }

  interface Comment {
    id: number;
    content: string;
    user: User;
    replies?: Reply[];
  }

  interface Reply {
    content: string;
    replyingTo: string;
    user: User;
  }

  interface User {
    image: string;
    name: string;
    username: string;
  }
}
