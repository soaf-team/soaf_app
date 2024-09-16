import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAsyncStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getAsyncStorage = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const removeAsyncStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
