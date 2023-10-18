export interface UserProfile {
  userId: string!;
  createdAt: string;
  profilePhoto: string;
  birthday: string;
  height: string;
  gender: string;
  location: {
    latitude: string;
    longitude: string;
    addressLine1: string;
    addressLine2: string;
    stateProvince: string;
    country: string;
    city: string;
    zipPostal: string;
  };
}

export interface UserPromptsOrderInput {
  userId: string!;
  promptIds: string[];
}

export interface UserTagsTypeVisibleInput {
  userId: string!;
  visible: string!;
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
  tagType: tag_type!;
  visible: boolean;
  userTags: UserTagsEntity[];
}

export interface UserTagsEntity {
  id: string!;
  userId: string;
  tagName: string!;
  tagType: tag_type!;
  tagId: string;
}

export interface UserProfileEntity {
  userId: string;
  createdAt: Date;
  displayName?: string;
  profilePhoto?: string;
  birthday?: string;
  height?: number;
  gender?: string;
  location: {
    latitude: string;
    longitude: string;
    addressLine1: string;
    addressLine2: string;
    stateProvince: string;
    country: string;
    city: string;
    zipPostal: string;
  };
}
