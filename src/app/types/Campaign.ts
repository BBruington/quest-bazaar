export interface Campaign {
    id: string;
    name: string;
    description: string;
    password: string | null;
    dmUserId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
