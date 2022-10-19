import { Box, ClickAwayListener, GlobalStyles, IconButton, styled, useTheme } from '@mui/material';
import { Dispatch, useState } from 'react';
import Iconify from './Iconify';

interface PickerProps {
  isLight: boolean;
}

const PickerStyled = styled('div')<PickerProps>(({ theme, isLight }) => ({
  backgroundColor: !isLight ? theme.palette.grey[600] : theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  position: 'absolute',
  bottom: 40,
  right: 0,
  zIndex: theme.zIndex.modal,
  '& .search': {
    backgroundColor: 'red',
  },
}));

interface EmojiPickerProps {
  value?: string;
  setValue?: Dispatch<string>;
  size?: 'large' | 'small' | 'medium' | undefined;
}

export default function EmojiPicker({ size = 'medium' }: EmojiPickerProps) {
  const [isPicker, setIsPicker] = useState<boolean>(false);

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <ClickAwayListener onClickAway={() => setIsPicker(false)}>
      <Box position="relative">
        <GlobalStyles
          styles={{
            'em-emoji-picker': {
              // '--rgb-background': '#fff',
            },
          }}
        />

        {isPicker && (
          <PickerStyled isLight={isLight}>
            {/* <MyEmojiPicker
              data={data}
              onEmojiSelect={(emoji: BaseEmoji) => setValue && setValue(value + emoji.native)}
              previewPosition="none"
              skinTonePosition="none"
              searchPosition="none"
            /> */}
          </PickerStyled>
        )}

        <IconButton size={size} onClick={() => setIsPicker(true)}>
          <Iconify icon="iconoir:emoji" />
        </IconButton>
      </Box>
    </ClickAwayListener>
  );
}
