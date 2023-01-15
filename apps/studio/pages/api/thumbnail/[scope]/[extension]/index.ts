import { existsSync } from "fs";
import { resolve } from "path";
import { getStorePath } from "server/store";

export default function handler(req, res) {
  console.log(req.query);
  const { scope, extension } = req.query;

  // Hello OS filesystem security... 🤣
  const path = resolve(getStorePath(), scope, extension, 'thumbnail.png');
  if (existsSync(path)) {
    res.status(200).sendFile(path);
  } else {
    res.status(404).end();
  }
}
