import { formatRelative } from 'date-fns';
import {encrypt, decrypt} from "aes256"

export const formatUserDate = date => {
    let formattedDate = '';
    if (date) {
      // Convert the date in words relative to the current date
      formattedDate = formatRelative(date, new Date());
      // Uppercase the first letter
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
};

export const decryptData = (data) => {
    if(data !== 'Hello' && data !== 'Welcome' && data !== 'Hi'){
        return decrypt(process.env.REACT_APP_PRIVATE_KEY, data);
    }else{
        return data
    }
}

export const encryptData = (data) => {
    if(data !== 'Hello' && data !== 'Welcome' && data !== 'Hi'){
        return encrypt(process.env.REACT_APP_PRIVATE_KEY, data);
    }else{
        return data
    }
}
