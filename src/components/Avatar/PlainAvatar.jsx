import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const PlainAvatar = (props) => {
  const { size = [], userPhoto = [] } = props;

  return (
    <Stack direction="row" spacing={""}>
      <Avatar
        src={userPhoto}
        sx={{
          width: size.height,
          height: size.width,
        }}
      />
    </Stack>
  );
};

export default PlainAvatar;
