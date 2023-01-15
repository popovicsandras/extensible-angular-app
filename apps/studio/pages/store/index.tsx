import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Extension from "components/store/extension";
import Upload from "components/store/upload";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { Fragment, useState } from "react";
import { getStorePath, type Package } from "server/store";

export default function Store({pkgs}: {pkgs: Package[]}) {
  const [packages, setPackages] = useState(pkgs);

  const template = packages.filter((item) => item.type === 'template');
  const components = packages.filter((item) => item.type === 'component');
  const widgets = packages.filter((item) => item.type === 'widget');
  const plugins = packages.filter((item) => item.type === 'plugin');

  const grouppedPackages = [
    { name: "Templates", packages: template },
    { name: "Components", packages: components },
    { name: "Widgets", packages: widgets },
    { name: "Plugins", packages: plugins }
  ];

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h4">Available extensions</Typography>
      </Grid>

      <Grid item sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginRight: '18px'}}>
        <Upload />
      </Grid>

      {grouppedPackages.map((container) => (
        <Fragment key={`${container.name}`}>
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">{container.name}</Typography>
          </Grid>

          <Grid item xs={12} sx={{ mb: -2.25, marginBottom: '24px' }}>
            <div css={{display: 'flex', gap: 24, flexWrap: 'wrap'}}>
              {
                ...container.packages.map((item) => <Extension
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
    </Grid>
  );
}

export function getServerSideProps() {
  const storePath = getStorePath();
  const packages: Package[] = [];

  readdirSync(storePath).forEach(file => {
    const scopeDir = resolve(storePath, file);
    readdirSync(scopeDir).forEach(pkg => {
      const pkgJson = JSON.parse(readFileSync(resolve(scopeDir, pkg, 'package.json')));
      packages.push({
        name: pkgJson.extension.name,
        scope: file,
        thumbnail: `/api/thumbnail/${pkgJson.name}`,
        version: pkgJson.version,
        cost: pkgJson.name === '@extensible-angular-app/custom-template' ? 23.9 : 0,
        rating: Math.random() * 5,
        type: pkgJson.extension.type
      })
    });
  });

  return {
    props: {
      pkgs: [
        ...packages,
        {
          name: "Basic Template",
          scope: "@acme",
          thumbnail: "/assets/hxp-template.png",
          version: "3.0.3",
          cost: 0,
          rating: 4.5,
          type: "template"
        },
        {
          name: "Dashboard",
          scope: "@ng-visionaires",
          thumbnail: "/assets/dashboard.png",
          version: "1.7.0",
          cost: 24.9,
          rating: 3,
          type: "component"
        },
        {
          name: "Static pages",
          scope: "@ng-visionaires",
          thumbnail: "/assets/static-pages.png",
          version: "0.6.9",
          cost: 13.9,
          rating: 4.5,
          type: "component"
        },
        {
          name: "Custom sidebar",
          scope: "@ng-visionaires",
          thumbnail: "/assets/dark-sidebar.png",
          version: "0.0.9",
          cost: 9.5,
          rating: 4,
          type: "widget"
        },
        {
          name: "Legacy compatibility",
          scope: "@ng-visionaires",
          thumbnail: "/assets/legacy-extensions.png",
          version: "0.6.9",
          cost: 0,
          rating: 3,
          type: "plugin"
        }
      ] as Package[]
    }
  };
}
