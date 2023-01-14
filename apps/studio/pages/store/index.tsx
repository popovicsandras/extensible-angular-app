import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Extension from "components/store/extension";
import { Fragment } from "react";

export default function Store() {

  const packages = [
    {
      name: "Basic Template",
      package: "@acme",
      image: "/assets/hxp-template.png",
      version: "3.0.3",
      cost: 0,
      rating: 4.5,
      type: "template"
    },
    {
      name: "Sirius Template",
      package: "@ng-visionaires",
      image: "/assets/template.png",
      version: "1.0.3",
      cost: 29.9,
      rating: 4,
      type: "template"
    },
    {
      name: "Content engine",
      package: "@acme",
      image: "/assets/content.jpg",
      version: "2.5.1",
      cost: 0,
      rating: 4,
      type: "component"
    },
    {
      name: "Process engine",
      package: "@acme",
      image: "/assets/process.png",
      version: "2.5.1",
      cost: 0,
      rating: 5,
      type: "component"
    },
    {
      name: "Dashboard",
      package: "@ng-visionaires",
      image: "/assets/dashboard.png",
      version: "1.7.0",
      cost: 24.9,
      rating: 3,
      type: "component"
    },
    {
      name: "Static pages",
      package: "@ng-visionaires",
      image: "/assets/static-pages.png",
      version: "0.6.9",
      cost: 13.9,
      rating: 4.5,
      type: "component"
    },
    {
      name: "Custom sidebar",
      package: "@ng-visionaires",
      image: "/assets/dark-sidebar.png",
      version: "0.0.9",
      cost: 9.5,
      rating: 4,
      type: "widget"
    },
    {
      name: "Legacy compatibility",
      package: "@ng-visionaires",
      image: "/assets/legacy-extensions.png",
      version: "0.6.9",
      cost: 0,
      rating: 3,
      type: "plugin"
    }
  ];

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
        <Button variant="contained" component="label" endIcon={<CloudUploadIcon />}>
          Upload extension
          <input type="file" hidden />
        </Button>
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
                  package={item.package}
                  thumbnail={item.image}
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
