import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Upload from "components/store/upload";
import { useState } from "react";
import { type Package } from "server/store";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { getExtensions } from "server/get-extensions";
import ExtensionList from "components/store/extension-list";

export default function Store({pkgs}: {pkgs: Package[]}) {
  const [packages, setPackages] = useState(pkgs);

  const addPackage = (pkg: Package) => {
    setPackages([...packages, pkg])
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      <Grid item xs={12} sx={{ mb: -2.25, position: 'sticky', top: '50px', backgroundColor: '#fafafb', paddingBottom: '24px' }}>
        <div css={{display: 'flex', justifyContent: 'space-between'}}>
          <div css={{display: 'flex', gap: '12px'}}>
            <LocalGroceryStoreIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4" css={{ lineHeight: '40px'}}>Extension store</Typography>
          </div>
          <Upload onSuccess={addPackage} />
        </div>
      </Grid>

      <ExtensionList pkgs={packages} />
    </Grid>
  );
}

export function getServerSideProps() {
  return getExtensions();
}
