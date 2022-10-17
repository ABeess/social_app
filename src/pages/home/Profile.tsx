import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from 'src/api/user.api';
import useRouter from 'src/hooks/useRouter';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setEnable } from 'src/redux/slice/enabledQuery.slice';
import { ProfileTabs, ProfileThumbnail } from 'src/sections/profile';
import { User } from 'src/types/Base';

export default function Profile() {
  const { params, pathname } = useRouter();
  console.log(params);
  console.log(pathname.includes('profile'));

  const user = useAppSelector((state) => state.auth.user) as User;
  const dispatch = useAppDispatch();

  useQuery(['PROFILE_USER', { user_id: user.id }], () => getProfile(user.id), {
    onSuccess() {
      dispatch(setEnable('profile'));
    },
  });

  return (
    <Container maxWidth="lg">
      <ProfileThumbnail />
      <ProfileTabs />
    </Container>
  );
}
