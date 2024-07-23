import { RootState, useAppSelector } from '@/redux/store';
export default function useAuth() {
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (user) {
    return true;
  } else {
    return false;
  }
}
