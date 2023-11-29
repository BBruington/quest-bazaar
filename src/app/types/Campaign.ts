export interface Campaign {
    id: string;
    name: string;
    description: string;
    password: string | null;
    dmUserId: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}
