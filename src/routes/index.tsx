import { lazy, LazyExoticComponent, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from 'src/layouts';

// eslint-disable-next-line react/display-name, arrow-body-style
const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<></>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
      ],
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        { element: <HomePage />, index: true },
        {
          path: 'post',
          element: <PostPage />,
        },
        {
          path: 'looking-friend',
          element: <LookingFriend />,
        },
        {
          path: 'profile/:id',
          element: <Profile />,
        },
      ],
    },
  ]);
}

const Login = Loadable(lazy(() => import('src/pages/auth/Login')));
const Register = Loadable(lazy(() => import('src/pages/auth/Register')));
const HomePage = Loadable(lazy(() => import('src/pages/Home')));

// Dashboard

const PostPage = Loadable(lazy(() => import('src/pages/home/Post')));

// const NotFound = Loadable(lazy(() => import('src/pages/Page404')));

// Home
const LookingFriend = Loadable(lazy(() => import('src/pages/home/LookingFriend')));
const Profile = Loadable(lazy(() => import('src/pages/home/Profile')));
