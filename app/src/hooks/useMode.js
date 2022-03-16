import {useEffect, useState} from "react"

export function useMode() {
    const [enabled, setEnabled] = useState(false)
    useEffect(
      () => {
        const className = 'dark';
        const element = window.document.body;
        if (enabled) {
          element.classList.add(className);
        } else {
          element.classList.remove(className);
        }
      },
      [enabled]
    );

    return [enabled, setEnabled];
  }
  