export interface FeedbackGroupInput {
  userId: string;
  raterId?: string;
}

export interface PersonalityFeedbackInput {
  personality: string;
}

export interface ProfileFeedbackInput {
  description: string;
  name: string;
}
