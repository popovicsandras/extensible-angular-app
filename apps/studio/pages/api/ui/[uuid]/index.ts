import { writeJsonSync } from 'fs-extra';
import { join } from 'node:path';
import { getConfigPath } from 'server/store';

// This is for Studio to handle the configuration of the UI
export default function handler(req, res) {
  if (req.method === 'PUT') {
    writeJsonSync(
      join(getConfigPath(), `${req.body.uuid}.json`),
      req.body
    );

    res.status(200).json({});
  }
}
