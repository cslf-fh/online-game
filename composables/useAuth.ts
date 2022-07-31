import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const useAuth = () => {
  const auth = getAuth();
  const userInfo = ref();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userInfo.value = user;
    } else {
      userInfo.value = undefined;
    }
  });

  const logOut = () => {
    signOut(auth);
  };

  return { userInfo: readonly(userInfo), signOut: logOut };
};

export default useAuth;
