import React from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuth } from "./hooks/useAuth";
import { useMode } from "./hooks/useMode";
import { MoonIcon, SunIcon } from "./Icons/Icons";
import Main from "./components/Main";

// const firebaseConfig = {
//   apiKey: "AIzaSyCiuhQ02t_YruLuieNtNzru_X6dUNBFMNs",
//   authDomain: "chat-app-29753.firebaseapp.com",
//   projectId: "chat-app-29753",
//   storageBucket: "chat-app-29753.appspot.com",
//   messagingSenderId: "953983344993",
//   appId: "1:953983344993:web:c309729f2024db3fe8a520",
//   measurementId: "G-YC5N842QHX"
// };

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});


function App() {
  const {user, initializing} = useAuth(firebase.auth());
  const [mode, setMode] = useMode();
  const THEME_ICON = mode ? SunIcon : MoonIcon

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (<>
   <div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 sm:px-8 shadow-md"
        style={{ height: 'var(--topbar-height)' }}
      >
        <div className="flex items-center">
          {user ? (
            <button
              onClick={signOut}
              className="uppercase text-sm font-medium text-primary-500 hover:text-white tracking-wide hover:bg-primary-500 bg-transparent rounded py-2 px-4 mr-4 focus:outline-none focus:ring focus:ring-primary-500 focus:ring-opacity-75 transition-all"
            >
              Sign out
            </button>
          ) : null}
          <THEME_ICON
            className="h-8 w-8 cursor-pointer"
            onClick={() => setMode(prev => !prev)}
          />
        </div>
      </header>
      <main
        className="flex-1"
        style={{ maxHeight: 'calc(100% - var(--topbar-height))' }}
      >
       <Main user = {user} initializing = {initializing} signInWithGoogle = {signInWithGoogle} />
      </main>
    </div>
  </>);
}

export default App;
