import { ReactElement, useEffect } from 'react';
import useRouter from 'src/hooks/useRouter';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setLocation } from 'src/redux/slice/location.slice';
import { PATH_AUTH } from 'src/routes/path';
import socket from 'src/utils/socket';
import { whiteListUrl } from 'src/utils/whitelistUrl';

interface IAuthGuard {
  children: ReactElement;
}

export const AuthGuard = ({ children }: IAuthGuard) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const locationPath = useAppSelector((state) => state.location.path);
  const dispatch = useAppDispatch();
  const { replace, pathname } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      replace(PATH_AUTH.login);
    }
    if (locationPath !== pathname && isAuthenticated && !whiteListUrl(pathname)) {
      dispatch(setLocation(pathname));
    }
  }, [isAuthenticated, pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      socket?.emit('JOIN_ROOM', user?.id);
    }
  }, [pathname]);

  return <>{children}</>;
};
