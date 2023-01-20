import Grid from "@mui/material/Grid";
import WebIcon from '@mui/icons-material/Web';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ExtensionSelector from "components/ui/extension-selector";
import { getExtensions } from "server/get-extensions";
import { Package } from "server/store";
import ExtensionEditor from "components/ui/extension-editor";
import { ConfigurationStoreContext } from "components/ui/config-context";
import useConfiguration from "services/use-configuration";
import Navigation from "components/ui/navigation";

export default function UiDesigner({pkgs}: {pkgs: Package[]}) {
  const {
    state,
    select,
    add,
    update
  } = useConfiguration();

  return (
    <ConfigurationStoreContext.Provider value={state}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25, position: 'sticky', top: '50px', backgroundColor: '#fafafb', paddingBottom: '24px' }}>
          <div css={{display: 'flex', gap: '12px'}}>
            <WebIcon sx={{ fontSize: 40 }} />
            <Typography variant="h4" css={{ lineHeight: '40px'}}>UI Designer</Typography>
          </div>
        </Grid>
        <Grid item sx={{display: 'flex', gap: '12px', maxWidth: '100%', minHeight: 'calc(100vh - 160px)', maxHeight: 'calc(100vh - 160px)'}}>
          <Card sx={{ minWidth: 350, overflow: 'auto' }} >
            <CardContent>
              <ExtensionSelector packages={pkgs} onClick={add} />
              <Navigation select={select} />
            </CardContent>
          </Card>
          { state.selected && <ExtensionEditor uuid={state.selected} update={update} /> }
        </Grid>
      </Grid>
    </ConfigurationStoreContext.Provider>
  );
}

export function getServerSideProps() {
  return getExtensions();
}
