import AsyncStorage from "@react-native-async-storage/async-storage";

const saveUserSession = async (value) => {
  try {
    await AsyncStorage.setItem("@is_logged_in", value);
  } catch (e) {
    // saving error
  }
};

export { saveUserSession };

const getUserSession = async () => {
  try {
    const value = await AsyncStorage.getItem("@is_logged_in");
    if (value !== null) {
      return value;
    }
    return "false";
  } catch (e) {
    // error reading value
  }
};

export { getUserSession };

/***  this will be called by user trying to loguot
 *
 * this will empty the flag of true
 * for the user logged in session
 *
 */
async function removeUserSession(navigation) {
  try {
    await AsyncStorage.setItem("@is_logged_in", "");
    navigation.replace("Login");
  } catch (e) {
    // saving error
  }
}

export { removeUserSession };
