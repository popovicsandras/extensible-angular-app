import PropTypes from 'prop-types';

// material-ui
import { Box, List, Typography, Collapse } from '@mui/material';

import { useReducer, useState, Fragment, useContext } from 'react';
import NavItem from './NavItem';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';
import { ConfigContext } from 'components/configs-context';

const customConfig = {
  dictionaries: [colors, animals],
  separator: '-',
  length: 2,
};

export function generateRandomName() {
  return uniqueNamesGenerator(customConfig);
}

export function generateRandomId() {
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
}

// project import

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const configs = useContext(ConfigContext);
    const [open, setOpen] = useState(false);
    const reducer = (state, action) => {
      switch (action.type) {
        case 'add':
          return {
            uis: [...state.uis, action.payload]
          }
      }
    };

    const [state, dispatch] = useReducer(reducer, {uis: configs ?? []});
    const drawerOpen = true;

    const onAdd = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const uuid = generateRandomId();
      const title = generateRandomName();

      fetch(`/api/ui`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          uuid
        })
      });

      setOpen(true);
      dispatch({
        type: 'add',
        payload: {
          title,
          uuid,
          url: `/ui/${uuid}`
        }
      });
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    const navCollapse = item.children?.map((menuItem) => {
        switch (menuItem.type) {
            case 'collapse':
                return (
                  <Fragment key={menuItem.id} >
                    <NavItem item={menuItem} level={1} onClick={handleOpen} onAdd={onAdd}/>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>
                        {state.uis.map((ui) => (
                          <NavItem key={ui.uuid} item={ui} level={1.5} />
                        ))}
                      </List>
                    </Collapse>
                  </Fragment>
                );
            case 'item':
                return <NavItem key={menuItem.id} item={menuItem} level={1} />;
            default:
                return (
                    <Typography key={menuItem.id} variant="h6" color="error" align="center">
                        Fix - Group Collapse or Items
                    </Typography>
                );
        }
    });

    return (
        <List
            subheader={
                item.title &&
                drawerOpen && (
                    <Box sx={{ pl: 3, mb: 1.5 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {item.title}
                        </Typography>
                        {/* only available in paid version */}
                    </Box>
                )
            }
            sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
        >
            {navCollapse}
        </List>
    );
};

NavGroup.propTypes = {
    item: PropTypes.object
};

export default NavGroup;
