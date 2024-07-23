import useAuth from './useAuth';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function Protected({ children }: Props) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : redirect('/');
}
