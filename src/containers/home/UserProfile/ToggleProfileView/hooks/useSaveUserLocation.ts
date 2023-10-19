import { useMutation } from "@apollo/client";
import {
  selectIsUserLocationDirty,
  selectUser,
  selectUserLocation,
} from "../../../../../store/features/user/userSlice";
import { useAppSelector } from "../../../../../store/hooks";
import { SAVE_USER_LOCATION } from "../../../../../services/graphql/profile/mutations";

export const useSaveUserLocation = () => {
  const locx = useAppSelector(selectUserLocation);
  const { user } = useAppSelector(selectUser);
  const isUserLocationDirty = useAppSelector(selectIsUserLocationDirty);
  const CreateLocationInput = {
    userId: user?.userId,
    latitude: locx?.latitude?.toString(),
    longitude: locx?.longitude?.toString(),
    addressLine1: locx?.addressLine1,
    city: locx?.city,
    stateProvince: locx?.stateProvince,
    country: locx?.country,
  };

  const [saveUserLocation] = useMutation(SAVE_USER_LOCATION, {
    variables: {
      CreateLocationInput,
    },
  });
  return [!locx || !isUserLocationDirty ? null : saveUserLocation];
};
