import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ExtensionMenuItem } from '../../services/extension-types/interfaces';
import NavItem from "./nav-item";

interface NavSectionProps {
  icon: OverridableComponent<SvgIconTypeMap> | string;
  blink: string;
  name: string;
  open: boolean;
  current: string | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClick: (uuid: string) => void;
  items: ExtensionMenuItem[];
}

export default function NavSection({icon: Icon, blink, name, open, setOpen, items, current, onClick}: PropsWithChildren<NavSectionProps>) {

  const expandCollapse = () => setOpen(!open);

  return (
    <>
      <ListItemButton onClick={expandCollapse}>
        <ListItemIcon sx={{minWidth: '40px'}}>
          <Icon sx={{fontSize: '20px'}} />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{paddingLeft: '12px'}}>
          {
            ...items.map(item => (
              <NavItem
                key={item.uuid}
                uuid={item.uuid}
                name={item.name}
                label={item.label}
                icon={item.icon ?? Icon}
                blink={blink}
                current={current}
                onClick={onClick}
                >
              </NavItem>
            )
          )}
        </List>
      </Collapse>
    </>
  );
}
