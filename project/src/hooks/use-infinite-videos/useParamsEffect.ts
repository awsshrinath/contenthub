import { useEffect, useRef } from 'react';
import { InfiniteVideosParams } from './types';

export function useParamsEffect(
  params: InfiniteVideosParams,
  onParamsChange: () => void
) {
  const prevParamsRef = useRef(params);

  useEffect(() => {
    const paramsChanged = Object.entries(params).some(
      ([key, value]) => prevParamsRef.current[key as keyof InfiniteVideosParams] !== value
    );

    if (paramsChanged) {
      prevParamsRef.current = params;
      onParamsChange();
    }
  }, [params, onParamsChange]);
}