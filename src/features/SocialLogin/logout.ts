import * as SecureStore from "expo-secure-store";
import { SECURE_STORE } from "../../utils/constants/expo-sercure-storage-keys";
import { multiRemove } from "../../utils/storage";

const logout = () => {
    SecureStore.deleteItemAsync(SECURE_STORE.APPLE_CREDENTIALS);
    multiRemove(["user", "userToken", "token", "userVisuals"]);
}

export default logout;