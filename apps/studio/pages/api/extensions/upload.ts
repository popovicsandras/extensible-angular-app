import formidable from "formidable";
import * as decompress from 'decompress';
import * as decompressTargz from 'decompress-targz';
import { tmpdir } from "os";
import { resolve } from "path";
import { moveSync, emptyDirSync } from "fs-extra";
import { readFile } from "node:fs/promises";
import { getStorePath } from "server/store";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).json({});
  });
};

const saveFile = async (file) => {
  const tmpDir = resolve(tmpdir(), `${file.newFilename}-decompressed`);
  emptyDirSync(tmpDir);

  await decompress(file.filepath, tmpDir, {plugins: [ decompressTargz() ]});

  const packageDir = resolve(tmpDir, 'package');
  const {name: packageName} = JSON.parse(await readFile(resolve(packageDir, 'package.json')));
  const [scope, packageFolder] = packageName.split('/');
  const destDir = resolve(getStorePath(), scope);
  moveSync(packageDir, resolve(destDir, packageFolder), { overwrite: true });
};

export default function handler(req, res){
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
};

