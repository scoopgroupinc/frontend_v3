export interface UserProfile {
  userId: string!;
  createdAt: string;
  profilePhoto: string;
  birthday: string;
  height: string;
  gender: string;
  locationId: string;
  jobTitle: string;
  company: string;
  homeTown: string;
  school: string;
}

export interface UserPromptsOrderInput {
  userId: string!;
  promptIds: string[];
}

export interface UserTagsTypeVisibleInput {
  userId: string!;
  visible: string!;
  emoji: string!;
  tagType: tag_type!;
  userTags: [UserTagsInput!];
}

export interface UserTagsInput {
  userId: string!;
  tagName: string!;
  tagType: tag_type!;
}

export interface UserTagsTypeVisibleEnity {
  id: string;
  userId: string;
  emoji: string;
  tagType: string!;
  visible: string!;
  userTags: [UserTagsEntity!]!;
}

export interface UserTagsEntity {
  id: string!;
  userId: string;
  tagName: string!;
  tagType: string!;
}
