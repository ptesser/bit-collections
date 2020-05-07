export function extractFiles(fileList: FileList) {
  const files: File[] = [];
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);
    if (file) {
      files.push(file);
    }
  }
  return files;
}
