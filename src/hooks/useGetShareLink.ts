import { Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_USER_SHARE_PROFILE_LINK } from "../services/graphql/user-link/mutations";
import { useShare } from "./useShare";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/features/user/userSlice";

export const useGetShareLink = () => {
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;
  const { share } = useShare();
  const [getShareLink] = useMutation(GET_USER_SHARE_PROFILE_LINK);
  const [link, setLink] = useState();

  const shareLinkToSocialMedia = async () => {
    try {
      const { data } = await getShareLink({
        variables: {
          userId,
        },
      });
      if (data?.getUserShareProfileLink?.id) {
        setLink(data?.getUserShareProfileLink);
        share(data?.getUserShareProfileLink?.id);
      } else {
        throw new Error("Unable to get link");
      }
    } catch (err) {
      Alert.alert("Oops", err);
    }
  };
  return [shareLinkToSocialMedia, link, setLink];
};
