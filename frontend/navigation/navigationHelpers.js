export const navigateToMain = (navigation) => {
  navigation.navigate("Main"); // Thay 'Main' bằng tên màn hình chính của bạn
};
export const navigateToLogin = (navigation) => {
  navigation.navigate("Login"); // Thay 'Main' bằng tên màn hình chính của bạn
};
export const navigateToChangePass = (navigation, email) => {
  navigation.navigate("ChangePassword", { email }); // Thay 'Main' bằng tên màn hình chính của bạn
};
