import { MutableRefObject, useEffect, useState } from 'react';

function useIntersection<T extends Element>(element : MutableRefObject<T | null>, rootMargin : string, firedOnce : boolean) {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    if (!element?.current) return () => {};

    const observer = new IntersectionObserver(([entry]) => {
      setState(entry.isIntersecting);
      if (entry.isIntersecting && firedOnce) observer.unobserve(element.current as T);
    }, { rootMargin });

    observer.observe(element.current);

    return () => {
      if (element?.current) observer.unobserve(element.current as T);
    };
  }, []);

  return isVisible;
}

export default useIntersection;