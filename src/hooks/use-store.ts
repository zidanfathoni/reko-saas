import type { TstoreDispatch, TstoreState } from '@/config';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// export const useAppStore = useStore.withTypes<Tstore>();
export const useAppSelector = useSelector.withTypes<TstoreState>();
export const useAppDispatch = useDispatch.withTypes<TstoreDispatch>();

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
