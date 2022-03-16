import React from 'react';
import {decryptData, formatUserDate} from "../utils/helper"

const Show = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
  }) => {
    if (!text) return null;

    console.log("=======createdAt=======", createdAt, text)
  
    return (
      <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
        {photoURL ? (
          <img
            src={photoURL}
            alt="Avatar"
            className="rounded-full mr-4"
            width={45}
            height={45}
          />
        ) : null}
        <div>
          <div className="flex items-center mb-1">
            {displayName ? (
              <p className="mr-2 text-primary-500">{displayName}</p>
            ) : null}
            {createdAt?.seconds ? (
              <span className="text-gray-500 text-xs">
                {formatUserDate(new Date(createdAt.seconds * 1000))}
              </span>
            ) : null}
          </div>
          <p>{decryptData(text)}</p>
        </div>
      </div>
    );
};

export default Show


  