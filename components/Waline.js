import React, { useEffect, useRef } from "react";

import {
  init,
} from '@waline/client/dist/waline.mjs';

import { useConfig } from '@/lib/config';

import '@waline/client/dist/waline.css';

export const WalineComment = () => {
  const waline = useConfig().comment.walineConfig;
  const walineInstanceRef = useRef(null);
  const containerRef = React.createRef();

  useEffect(() => {
    walineInstanceRef.current = init({
      ...waline,
      el: containerRef.current,
    });

    return () => walineInstanceRef.current?.destroy();
  }, []);

  return <div ref={containerRef} />;
}
