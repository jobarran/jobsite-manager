import { Divider, List } from '@mui/material';

import { SideMenuItemOption } from '.';
import { sideMenuAdmin } from '../../config';



export const SideMenuItemListAdmin = () => {

  return (
    <>
      <Divider textAlign="left">Options</Divider>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
      {
        sideMenuAdmin.map( item => (
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

