export interface Campaign {
  id: string;
  name: string;
  description: string;
  image: string | null;
  password: string | null;
  dmUserId: string;
  dmName: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Players {
  email: string;
  id: string;
  username: string | null;
  imgUrl: string;
  clerkId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
[];
