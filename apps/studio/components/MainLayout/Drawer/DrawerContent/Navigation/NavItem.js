import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Link from 'next/link';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WebIcon from '@mui/icons-material/Web';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level, onClick, onAdd }) => {
    const theme = useTheme();
    const drawerOpen = true;

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = item.type === 'collapse' ? {
        component: 'span',
        onClick: onClick
      } : {
        component: forwardRef(function Sanyi(props, ref) {
          return <Link ref={ref} {...props} href={item.url} />;
        })
      };
    if (item?.external) {
        let listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1.25rem' : '1.15rem', position: 'relative', top: '-1px', marginRight: '16px' }} /> : <WebIcon style={{ fontSize: drawerOpen ? '1.25rem' : '1.15rem', position: 'relative', top: '-1px', marginRight: '16px' }}  />;

    const isSelected = false;

    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            selected={isSelected}
            sx={{
                zIndex: 1201,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 1.25 : 1,
                ...(drawerOpen && {
                    '&:hover': {
                        bgcolor: 'primary.lighter'
                    },
                    '&.Mui-selected': {
                        bgcolor: 'primary.lighter',
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        color: iconSelectedColor,
                        '&:hover': {
                            color: iconSelectedColor,
                            bgcolor: 'primary.lighter'
                        }
                    }
                }),
                ...(!drawerOpen && {
                    '&:hover': {
                        bgcolor: 'transparent'
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: 'transparent'
                        },
                        bgcolor: 'transparent'
                    }
                })
            }}
        >
            {itemIcon && (
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'secondary.lighter'
                            }
                        }),
                        ...(!drawerOpen &&
                            isSelected && {
                                bgcolor: 'primary.lighter',
                                '&:hover': {
                                    bgcolor: 'primary.lighter'
                                }
                            })
                    }}
                >
                    {itemIcon}
                </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                            {item.title}
                        </Typography>
                    }
                />
            )}
            {item.type === 'collapse' && (
              <IconButton aria-label="delete" size="small" onClick={onAdd}>
                <AddIcon fontSize="small" />
              </IconButton>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
