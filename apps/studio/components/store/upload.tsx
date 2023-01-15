import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Upload() {

  const uploadToServer = async (event) => {
    const packageArchieve = event.target.files[0];

    if (packageArchieve) {
      const body = new FormData();
      body.append("file", packageArchieve);
      const response = await fetch("/api/extensions/upload", {
        method: "POST",
        body
      });
      const data = await response.json();
    }
  };

  return (
    <Button variant="contained" component="label" endIcon={<CloudUploadIcon />}>
      Upload extension
      <input type="file" hidden onChange={uploadToServer} accept=".tgz" />
    </Button>
  );
}
