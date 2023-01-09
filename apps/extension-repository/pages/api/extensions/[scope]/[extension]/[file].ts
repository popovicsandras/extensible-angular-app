import { existsSync } from "fs";
import { join, resolve } from "path";

export default function handler(req, res) {
  console.log(req.query);
  const { scope, extension, file } = req.query;

  // Hello OS filesystem security... 🤣
  const path = resolve(getStorePath(), scope, extension, 'mf', file);
  if (existsSync(path)) {
    res.status(200).sendFile(path);
  } else {
    res.status(404).end();
  }
}

function getStorePath() {
  const appPrefix = '.extension-repository-store';
  return join(process.cwd(), appPrefix)
}
