import AsyncStorage from "@react-native-async-storage/async-storage";

const storeStringData = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, value);
};

const storeObjectData = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const getStringData = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

const getObjectData = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return JSON.parse(value!);
};

const removeData = async (key: string) => {
  await AsyncStorage.removeItem(key).then((res) => {
    console.log("removeData", res);
  });
};

const multiRemove = async (keys: string[]) => {
  await AsyncStorage.multiRemove(keys);
};

// Becareful with this function. Removes whole AsyncStorage data, for all clients, libraries, etc.
const clearAll = async () => {
  await AsyncStorage.clear();
};

export {
  storeStringData,
  storeObjectData,
  getStringData,
  getObjectData,
  removeData,
  multiRemove,
  clearAll,
};
