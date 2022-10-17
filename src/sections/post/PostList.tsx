import {
  Avatar,
  AvatarGroup,
  Box,
  CardMedia,
  Divider,
  Link as MUILink,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getLikePost } from 'src/api/post.api';
import IconButtonAnimate from 'src/components/animate/IconButtonAnimate';
import Iconify from 'src/components/Iconify';
import PreviewImageMultiple from 'src/components/PreviewImageMultiple';
import ProfileTooltip from 'src/components/ProfileTooltip';
import { useAppSelector } from 'src/redux/hooks';
import { PATH_DASHBOARD } from 'src/routes/path';
import { Post } from 'src/types/Base';
import { CurrentLike, LikePostResponse } from 'src/types/Response';
import { fDistanceToNow } from 'src/utils/formatTime';
import PostSocialAction from './PostSocialAction';

const RootStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(2, 2),
}));

const HeaderStyled = styled('header')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ContentStyled = styled('section')(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AvatarIconStyled = styled(Avatar)(() => ({
  width: 20,
  height: 20,
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const TextStyled = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  '&:hover': {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const CardMediaStyled = styled(CardMedia)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxHeight: theme.breakpoints.values.sm,
  objectFit: 'contain',
  backgroundColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
})) as typeof CardMedia;

interface PostListProps {
  post: Post;
}

export default function PostList({ post }: PostListProps) {
  const user = useAppSelector((state) => state.auth.user);

  const { avatar, firstName, lastName, id: userId } = post.user;
  const { image, content, createdAt, comment } = post;
  const [likeResponse, setLikeResponse] = useState<Partial<LikePostResponse>>({});

  const { totalLike, currentLike } = likeResponse;

  useQuery(
    ['LIKE_POST_QUERY', { postId: post.id }],
    () =>
      getLikePost({
        userId: user?.id as string,
        postId: post.id as string,
      }),
    {
      onSuccess(data) {
        setLikeResponse(data);
      },
    }
  );

  const handleLikeSuccess = (currentLike: CurrentLike) => {
    setLikeResponse((prev) => ({
      ...prev,
      currentLike,
      totalLike: !prev?.currentLike?.type ? Number(prev.totalLike) + 1 : prev.totalLike,
    }));
  };

  const handleUnlikeSuccess = () => {
    setLikeResponse((prev) => ({
      ...prev,
      currentLike: {
        like: false,
        type: '',
      },
      totalLike: Number(prev.totalLike) - 1,
    }));
  };

  const linkTo = (id: string) => PATH_DASHBOARD.profile(id);

  return (
    <RootStyled>
      <HeaderStyled>
        <Stack direction="row" spacing={1} alignItems="center">
          <ProfileTooltip userId={String(userId)}>
            <Avatar src={avatar || ''} />
          </ProfileTooltip>
          <Stack>
            <ProfileTooltip userId={String(userId)}>
              <MUILink
                variant="subtitle1"
                component={Link}
                to={linkTo(userId as string)}
                color="inherit"
                underline="hover"
                sx={{ textTransform: 'capitalize', cursor: 'pointer' }}
              >{`${firstName} ${lastName}`}</MUILink>
            </ProfileTooltip>

            <Stack direction="row" spacing={0.5}>
              <Typography variant="caption">{fDistanceToNow(createdAt)}</Typography>
              <Tooltip title="public" placement="top">
                <Box>
                  <Iconify icon="ic:baseline-public" />
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
        <IconButtonAnimate>
          <Iconify icon="mingcute:more-1-line" />
        </IconButtonAnimate>
      </HeaderStyled>

      <ContentStyled>
        <Typography variant="body2">{content}</Typography>

        {image.length === 1 ? (
          image[0].type === 'image*/mp4' ? (
            <CardMediaStyled component="video" src={image[0].url || ''} controls loop defaultValue={10} />
          ) : (
            <CardMediaStyled component="img" src={image[0].url || ''} />
          )
        ) : (
          <PreviewImageMultiple listImage={image} />
        )}
      </ContentStyled>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1} mb={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AvatarGroup spacing={4} max={2} sx={{ '& .MuiAvatar-root': { border: 'none' } }}>
            <AvatarIconStyled sx={{ bgcolor: 'info.main' }}>
              <Iconify icon="fontisto:like" color="common.white" sx={{ width: 12, height: 12 }} />
            </AvatarIconStyled>
            <AvatarIconStyled sx={{ bgcolor: 'error.main' }}>
              <Iconify icon="ci:heart-fill" color="common.white" sx={{ width: 12, height: 12 }} />
            </AvatarIconStyled>
          </AvatarGroup>
          <TextStyled>{totalLike || 0}</TextStyled>
        </Stack>
        <Stack direction="row" spacing={1}>
          <TextStyled>{totalLike || 0} Like</TextStyled>
          <TextStyled>{comment?.length || 0} comments</TextStyled>
        </Stack>
      </Stack>
      <Divider />
      <PostSocialAction
        post={post}
        currentLike={currentLike as CurrentLike}
        handleLikeSuccess={handleLikeSuccess}
        handleUnlike={handleUnlikeSuccess}
      />
      <Divider />
    </RootStyled>
  );
}
