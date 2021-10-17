import { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */

function handleClickOutside(event, ref, callback) {
  if (ref.current && !ref.current.contains(event.target)) {
    callback();
  }
}

function useOutsideAlerter(ref, isVisible, callback = () => {}) {
    useEffect(() => {
      if (typeof window !== "undefined" && isVisible) {
        // Bind the event listener
        document.addEventListener("mousedown", (event) => handleClickOutside(event, ref, callback));
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", (event) => handleClickOutside(event, ref));
        };
      }
    }, [ref, isVisible]);
}


export default useOutsideAlerter