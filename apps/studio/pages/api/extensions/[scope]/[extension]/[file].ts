import { existsSync } from "fs";
import { resolve } from "path";
import { enbleCors } from "server/cors";
import { getStorePath } from "server/store";

export default function handler(req, res) {
  const { scope, extension, file } = req.query;

  // Hello OS filesystem security... 🤣
  const path = resolve(getStorePath(), scope, extension, 'mf', file);
  if (existsSync(path)) {
    enbleCors(req, res);
    res.status(200).sendFile(path);
  } else {
    res.status(404).end();
  }
}
