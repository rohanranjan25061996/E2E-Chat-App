import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase/compat/app';
import {useFirestoreQuery} from "../hooks/useFireStoreQuery"
import Show from './Show';
import { encryptData } from '../utils/helper';


const Display = ({ user = null }) => {
    const db = firebase.firestore();
    const messagesRef = db.collection('messages');
    console.log("========messagesRef========", messagesRef)
    const messages = useFirestoreQuery(
      messagesRef.orderBy('createdAt', 'desc').limit(100)
    );

    console.log("========messages========", messages)
  
    const [newMessage, setNewMessage] = useState('');
  
    const inputRef = useRef();
    const bottomListRef = useRef();
  
    const { uid, displayName, photoURL } = user;
  
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef]);
  
    const handleOnChange = e => {
      setNewMessage(e.target.value);
    };
  
    const handleOnSubmit = e => {
      e.preventDefault();
  
      const trimmedMessage = newMessage.trim();
      const encryptMessage = encryptData(trimmedMessage)
      console.log("=======encryptMessage=====", encryptMessage);
      if (trimmedMessage) {
        messagesRef.add({
          text: encryptMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          displayName,
          photoURL,
        });
        setNewMessage('');
        bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <div className="flex flex-col h-full">
        <div className="overflow-auto h-full">
          <div className="py-4 max-w-screen-lg mx-auto">
            <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
              <div className="font-bold text-3xl text-center">
                <p className="mb-1">Welcome to</p>
                <p className="mb-3">Group Chat App</p>
              </div>
              <p className="text-gray-400 text-center">
                Let's start gupsup.
              </p>
            </div>
            <ul>
              {messages
                ?.sort((first, second) =>
                  first?.createdAt?.seconds <= second?.createdAt?.seconds ? -1 : 1
                )
                ?.map(message => (
                  <li key={message.id}>
                    <Show {...message} />
                  </li>
                ))}
            </ul>
            <div ref={bottomListRef} />
          </div>
        </div>
        <div className="mb-6 mx-4">
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
          >
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleOnChange}
              placeholder="Type your message here..."
              className="flex-1 bg-transparent outline-none"
            />
            <button
              type="submit"
              disabled={!newMessage}
              className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
};

export default Display