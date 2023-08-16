import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import styles from './BorderedAvatar.module.css';

const BorderedAvatar = (props) => {
  const { size = [], userPhoto = [], type = 'solid' } = props;

  let gradientStyle = '';

  if (type === 'gradient') {
    gradientStyle = styles.gradient;
  }

  return (
    <Stack direction="row" spacing={""}>
      <div className={`${styles.avatar} ${gradientStyle}`}>
      <Avatar
        src={userPhoto}
        sx={{
          width: size.height,
          height: size.width,
          border: '2px solid var(--bg-layer1)'
        }}
      />
      </div>
    </Stack>
  );
};

export default BorderedAvatar;
