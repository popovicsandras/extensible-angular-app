import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Package } from "server/store";

export default function Upload({onSuccess}: {onSuccess: (pkg: Package) => void }) {

  const uploadToServer = async (event) => {
    const packageArchieve = event.target.files[0];

    if (packageArchieve) {
      const body = new FormData();
      body.append("file", packageArchieve);
      const response = await fetch("/api/extensions/upload", {
        method: "POST",
        body
      });
      const pkg: Package = await response.json();
      onSuccess(pkg);
    }
  };

  return (
    <Button variant="contained" component="label" endIcon={<CloudUploadIcon />}>
      Upload extension
      <input type="file" hidden onChange={uploadToServer} accept=".tgz" />
    </Button>
  );
}
