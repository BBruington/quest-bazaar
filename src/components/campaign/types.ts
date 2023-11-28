export interface Campaign {
  id: string;
  name: string;
  description: string;
  image: string | null;
  password: string | null;
  dmUserId: string;
  dmName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Players {
  email: string;
  id: string;
  username: string | null;
  imgUrl: string;
  clerkId: string;
  createdAt: string;
  updatedAt: string;
}
[];
