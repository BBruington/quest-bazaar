export interface Campaign {
  id: string;
  name: string;
  description: string;
  image: string | null;
  password: string | null;
  dmUserId: string;
  dmProfileImg: string | null;
  dmName: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Players {
  email: string;
  id: string;
  username: string | null;
  imgUrl: string | null;
  clerkId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
[];
