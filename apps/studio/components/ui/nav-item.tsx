import { Chip, Grow, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from "@mui/material";
import { PropsWithChildren, useRef } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import GenericIcon from '@mui/material/Icon';

interface NavItemProps {
  icon: OverridableComponent<SvgIconTypeMap> | string;
  blink: string;
  name: string;
  label?: string;
  uuid: string;
}

export default function NavItem({icon, name, label, uuid, blink}: PropsWithChildren<NavItemProps>) {
  const blinkedList = useRef([] as string[]);

  blinkedList.current = [
    ...blinkedList.current,
    blink
  ].slice(-2);

  const newItemAddedTheFirstTime = blinkedList.current[blinkedList.current.length - 1] !== blinkedList.current[blinkedList.current.length - 2];

  const ElementWrapper = ({children, blink, ...props}) => {
    if (!blink) {
      return (
        <ListItemButton draggable {...props}>
          {children}
        </ListItemButton>
      );
    }

    return (
      <Grow in={true} timeout={500}>
        <ListItemButton draggable {...props}>
          {children}
        </ListItemButton>
      </Grow>
    );
  };

  const Icon: any = typeof icon === 'string' ? ({...props}) => <GenericIcon {...props}>{icon}</GenericIcon> : icon;

  return (
    <ElementWrapper key={uuid} blink={blink === uuid && newItemAddedTheFirstTime}>
      <ListItemIcon sx={{minWidth: '40px'}}>
        <Icon sx={{fontSize: '20px'}} />
      </ListItemIcon>
      <ListItemText primary={name} sx={{flex: '0 1 auto'}} />
      {label && <Chip label={label} color="primary" variant="outlined" size="small" sx={{borderRadius: '16px', height: '18px', fontSize: '0.6125rem', marginLeft: '6px'}} /> }
    </ElementWrapper>
  );
}
