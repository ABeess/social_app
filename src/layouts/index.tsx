import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from 'src/guards/AuthGuard';
import DashboardLayout from './dashboard';
import LogoOnly from './LogoOnly';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const MainStyle = styled('main')(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(15),
  paddingRight: theme.spacing(4),
  paddingLeft: theme.spacing(4),
  paddingBottom: theme.spacing(15),
}));

type Variants = 'dashboard' | 'logoOnly' | 'main';
interface ILayout {
  variants?: Variants;
}

export default function Layout({ variants = 'dashboard' }: ILayout) {
  if (variants === 'logoOnly') {
    return <LogoOnly />;
  }

  if (variants === 'main') {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return (
    <RootStyle>
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>

      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
