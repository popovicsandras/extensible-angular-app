import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Extension from "components/store/extension";
import { Fragment } from "react";
import { type Package } from "server/store";

export default function ExtensionList({pkgs, onClick}: {pkgs: Package[], onClick?: (pkg: Package) => void}) {
  const template = pkgs.filter((item) => item.type === 'template');
  const components = pkgs.filter((item) => item.type === 'component');
  const widgets = pkgs.filter((item) => item.type === 'widget');
  const plugins = pkgs.filter((item) => item.type === 'plugin');

  const grouppedPackages = [
    { name: "Templates", packages: template },
    { name: "Components", packages: components },
    { name: "Widgets", packages: widgets },
    { name: "Plugins", packages: plugins }
  ];

  return (
    <>
      {grouppedPackages.map((container) => (
        <Fragment key={`${container.name}`}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">{container.name}</Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: -2.25, marginBottom: '24px' }}>
            <div css={{display: 'flex', gap: 24, flexWrap: 'wrap'}}>
              {
                ...container.packages.map((item) => <Extension
                  onClick={onClick ? () => onClick(item) : null}
                  key={item.name}
                  name={item.name}
                  scope={item.scope}
                  thumbnail={item.thumbnail}
                  version={item.version}
                  cost={item.cost}
                  rating={item.rating}
                  type={item.type}
                />)
              }
            </div>
          </Grid>
        </Fragment>
      ))}
    </>
  );
}
