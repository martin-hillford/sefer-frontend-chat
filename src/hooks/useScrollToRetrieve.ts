import { MutableRefObject, useEffect, useState } from 'react';

const retrievingThreshold = 500;

// This method simply determines is the user is scrolling in the retrieve more section
export default (ref : MutableRefObject<any>, hasMessages : boolean) => {
  const [inScrollArea, setInScrollArea] = useState(false);

  useEffect(() => {
    if (!ref?.current || !hasMessages) return () => {};

    const listener = () => {
      if (ref.current.scrollTop < retrievingThreshold) setInScrollArea(true);
      else setInScrollArea(false);
    };

    ref.current.addEventListener('scroll', listener);
    return () => { ref?.current?.removeEventListener('scroll', listener); };
  }, [hasMessages, ref]);

  return inScrollArea;
};
