import { writeJsonSync } from 'fs-extra';
import { join } from 'node:path';
import { getConfigPath } from 'server/store';

export default function handler(req, res) {
  if (req.method === 'PUT') {
    writeJsonSync(
      join(getConfigPath(), `${req.body.uuid}.json`),
      req.body
    );

    res.status(200).json({});
  }
}
