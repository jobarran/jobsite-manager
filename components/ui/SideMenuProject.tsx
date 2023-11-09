import { Divider, List } from '@mui/material';

import { SideMenuItemOption } from '.';
import { FC } from 'react';
import { sideMenuProject } from '@/config';

interface Props {
  activeProject: any
}

export const SideMenuProject:FC<Props> = ({activeProject}) => {

  return (
        <>
          <Divider textAlign="left">{activeProject.name}</Divider>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
          {
            sideMenuProject.map( item => (
              <SideMenuItemOption
                key={ item.name }
                Avatar={ item.avatar }
                name={ item.name }
                url={ item.url }
              />
            ) )
          }
          </List>
        </>
  );
}

