import { Chip, Collapse, List, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import GenericIcon from '@mui/material/Icon';

interface GroupItem {
  Icon: OverridableComponent<SvgIconTypeMap>;
  title: string;
  items: {
    name: string;
    label?: string;
    icon?: string;
    uuid: string;
  }[]
}

interface SoleItem {
  Icon: OverridableComponent<SvgIconTypeMap>;
  title: string;
  uuid: string;
}

type NavSectionProps = GroupItem | SoleItem;

export default function NavSection({Icon, title, ...optional}: PropsWithChildren<NavSectionProps>) {
  const [open, setOpen] = useState(false);

  const items = (optional as Partial<GroupItem>).items ?? [];

  const expandCollapse = () => {
    if ('items' in optional) {
      setOpen(!open);
    } else {
      console.log('No items');
    }
  };

  return (
    <>
      <ListItemButton onClick={expandCollapse}>
        <ListItemIcon sx={{minWidth: '40px'}}>
          <Icon sx={{fontSize: '20px'}} />
        </ListItemIcon>
        <ListItemText primary={title} />
        {items.length > 1 ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>

      {items.length > 1 && <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {...items.map(item =>
            <ListItemButton draggable key={item.uuid} sx={{ pl: 4 }}>
              <ListItemIcon sx={{minWidth: '40px'}}>
                <GenericIcon>{item.icon}</GenericIcon>
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{flex: '0 1 auto'}} />
              {item.label && <Chip label={item.label} color="primary" variant="outlined" size="small" sx={{borderRadius: '16px', height: '18px', fontSize: '0.6125rem', marginLeft: '6px'}} /> }
            </ListItemButton>
          )}
        </List>
      </Collapse>}
    </>
  );
}
