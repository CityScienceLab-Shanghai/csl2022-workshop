import { useLayoutEffect, useState, useCallback, RefObject } from "react";
import ResizeObserver from "resize-observer-polyfill";


export const useResizeObserver = (
  ref,
  callback=null
) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const handleResize = useCallback(
    (entries) => {
      if (!Array.isArray(entries)) {
        return;
      }

      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);

      if (callback) {
        callback(entry.contentRect);
      }
    },
    [callback]
  );

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    let RO = new ResizeObserver((entries) =>
      handleResize(entries)
    );
    RO.observe(ref.current);

    return () => {
      RO.disconnect();
      RO = null;
    };
  }, [ref]);

  return [width, height];
};
