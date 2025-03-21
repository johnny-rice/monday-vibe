import fs from "fs";
import path from "path";
const ICONS_FOLDERS = path.resolve("./src/svg/");
const METADATA_FILENAME = "iconsMetaData.ts";
const METADATA_FILE_PATH = path.resolve("./src") + "/" + METADATA_FILENAME;

function getIconsFiles() {
  return fs.readdirSync(ICONS_FOLDERS);
}

function getIconsMetaFiles() {
  let file = fs.readFileSync(METADATA_FILE_PATH, { encoding: "utf-8" });
  file.substr(file.indexOf("iconsMetaData"));
  return [...file.matchAll(/file: "(?<name>.*?)"/g)].map(f => f.groups.name);
}

function getFilesWithNoMetadata() {
  const actualFiles = getIconsFiles().filter(f => f.endsWith(".svg"));
  const actualFilesSet = new Set(actualFiles);
  const metaFiles = getIconsMetaFiles();
  const metaFilesSet = new Set(metaFiles);

  const metaBadReferences = metaFiles.filter(f => !actualFilesSet.has(f));
  const fileWithNoMeta = actualFiles.filter(f => !metaFilesSet.has(f));
  return { metaBadReferences, fileWithNoMeta };
}

export default getFilesWithNoMetadata;
