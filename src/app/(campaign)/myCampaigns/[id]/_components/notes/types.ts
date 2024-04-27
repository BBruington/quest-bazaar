export type CampaignNote = {
  id: string;
  campaignId: string;
  private: boolean;
  title: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}