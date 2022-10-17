import { Box } from '@mui/material';
import Page from 'src/components/Page';
import { FiendRequest, FriendRecommend, FriendShipWaiting } from 'src/sections/looking-friend';

export default function LookingFriend() {
  return (
    <Page title="Friend">
      <Box>
        <FiendRequest />
        <FriendShipWaiting />
        <FriendRecommend />
      </Box>
    </Page>
  );
}
