const getFiles = `SELECT * FROM "files"`;
const addFile = `INSERT INTO "files" ("id", "name", "content") VALUES ($1, $2, $3)`;
const deleteFile = `DELETE FROM "files" WHERE "id" = $1`;
const updateFile = `UPDATE "files" SET "content" = $1 WHERE "id" = $2`;

module.exports = {
  getFiles,
  addFile,
  deleteFile,
  updateFile,
};
