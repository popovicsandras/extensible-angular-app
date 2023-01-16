import { Button, Card, CardContent, Grid, Modal } from "@mui/material";
import ExtensionList from "components/store/extension-list";
import { type Package } from "server/store";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

export default function ExtensionSelector({packages, onClick}: {packages: Package[], onClick: (pkg: Package) => void}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} color="primary" variant="contained" sx={{width: '100%'}} component="label" startIcon={<AddIcon />}>
        Add extension
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{width: '80%', height: '80%', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <Card sx={{width: '100%', height: '100%', overflow: 'auto', padding: '24px'}}>
          <CardContent>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
              <ExtensionList pkgs={packages} onClick={(pkg) => {
                onClick(pkg);
                handleClose();
              }} />
            </Grid>
          </CardContent>
        </Card>

      </Modal>
    </>
  );
}
