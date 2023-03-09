import Grid from "@mui/material/Grid";
import WebIcon from '@mui/icons-material/Web';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ExtensionSelector from "components/ui/extension-selector";
import { getExtensions } from "server/get-extensions";
import { getConfigPath, Package } from "server/store";
import ExtensionEditor from "components/ui/extension-editor";
import { ConfigurationStoreContext } from "components/ui/config-context";
import useConfiguration from "services/use-configuration";
import Navigation from "components/ui/navigation";
import { readFileSync } from "fs";
import { resolve } from "path";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { type PersistedConfigurationState } from "services/configuration.reducer";
import { StyledSnackbar } from "components/ui/snackbar";
import { SnackbarCloseReason } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import io from 'Socket.IO-client'
let socket;

const socketInitializer = async () => {
  await fetch('/api/socket/')
  socket = io();

  socket.on('connect', () => {
    console.log('connected')
  });
}

declare const PREVIEW_HOST: string;
declare const PREVIEW_PORT: string;

const previewHost = `${PREVIEW_HOST}:${PREVIEW_PORT}`;

export default function UiDesigner({pkgs, config}: {pkgs: Package[], config: any}) {
  const [open, setOpen] = useState(false);
  const {
    state,
    select,
    add,
    update,
    reset
  } = useConfiguration();

  useEffect(() => {
    reset(config);
  }, [config, reset])

  useEffect(() => {
    socketInitializer();
  }, []);

  const save = async () => {
    const payload: PersistedConfigurationState = {
      uuid: state.uuid,
      title: state.title,
      extensions: state.extensions,
      template: state.template
    };

    const result = await fetch(`/api/ui/${state.uuid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    socket.emit('updated', state.uuid);
    console.log(result);
    setOpen(true);
  }

  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ConfigurationStoreContext.Provider value={state}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25, position: 'sticky', top: '50px', backgroundColor: '#fafafb', paddingBottom: '24px' }}>
          <div css={{display: 'flex', gap: '12px', justifyContent: 'space-between'}}>
            <div css={{display: 'flex', gap: '12px'}}>
              <WebIcon sx={{ fontSize: 40 }} />
              <Typography variant="h4" css={{ lineHeight: '40px'}}>UI Designer: {state.title} ({state.uuid})</Typography>
            </div>
            <div css={{display: 'flex', gap: '12px'}}>
              <Button variant="contained" color="secondary" onClick={() => window.open(`/api/ui/${state.uuid}/config`, '_blank')}>
                <BugReportIcon />
              </Button>
              <Button variant="contained" color="error">
                <BuildCircleIcon sx={{ mr: 1 }} />
                Build
              </Button>
              <Button variant="contained" color="success" onClick={save}>
                <CloudUploadIcon sx={{ mr: 1 }} />
                Save
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item sx={{display: 'flex', flex: '1 0 auto', gap: '12px', maxWidth: '100%', minHeight: 'calc(100vh - 160px)', maxHeight: 'calc(100vh - 160px)'}}>
          <div css={{ minWidth: 350, overflow: 'auto', display: 'flex', gap: 16, flexDirection: 'column' }}>
            <Card sx={{ minWidth: 350, overflow: 'auto', flexGrow: '1' }} >
              <CardContent>
                <ExtensionSelector packages={pkgs} onClick={add} />
                <Navigation select={select} />
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 350, overflow: 'hidden', flexGrow: '0', marginBottom: '1px', width: '350px', height: '200px', position: 'relative' }} >
              <iframe src={`${previewHost}/${state.uuid}`} css={{ transformOrigin: '0 0', transform: 'scale(0.25)', width: '1400px', height: '800px', border: 'none' }} />
              <button
                css={{opacity: 0, width: '350px', height: '200px', position: 'absolute', top: 0, left: 0, cursor: 'pointer'}}
                onClick={() => window.open(`${previewHost}/${state.uuid}`, '_blank')}
              ></button>
            </Card>
          </div>
          { state.selected && <ExtensionEditor uuid={state.selected} update={update} /> }
        </Grid>
      </Grid>
      <StyledSnackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        Succesfully saved!
      </StyledSnackbar>
    </ConfigurationStoreContext.Provider>
  );
}

export function getServerSideProps(context) {
  const uuid = context.params.uuid;

  const config = JSON.parse(readFileSync(resolve(getConfigPath(), `${uuid}.json`), 'utf8'));
  const { props } =  getExtensions();

  return {
    props: {
      ...props,
      config
    }
  };
}
