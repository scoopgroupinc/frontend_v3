export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: string;
  salt: string;
  code: number;
  isVerified: boolean;
  resetCode: number;
}
export interface UserToken {
  token: string;
  user: User;
  message: string;
}

export interface GetPromptsType {
  getPrompts: Prompts[];
}

export interface Prompts {
  id: string;
  prompt: string;
  type: string;
  sample_answer: string;
}
export interface UserPrompts {
  id: string;
  userId: string;
  promptId: string;
  prompt: string;
  answer: string;
}
export interface GetPromptsOrderType {
  getUserPromptsOrder: PromptsOrder[];
}

export interface PromptsOrder {
  id: string;
  createdAt?: string;
  userId: string;
  promptId: string;
  prompt: string;
  answer: string;
  __typename?: string;
}

export interface GetUserPrompts {
  getAllUserPrompts: UserPrompts[];
}
