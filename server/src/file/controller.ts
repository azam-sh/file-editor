const { pool } = require("../../db");
const queries = require("./queries");
import { Request, Response } from "express";
import { QueryResult } from "pg";

const getFiles = (req: Request, res: Response) => {
  pool.query(queries.getFiles, (error: any, results: QueryResult) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addFile = (req: Request, res: Response) => {
  const { id, name, content } = req.body;

  pool.query(
    queries.addFile,
    [id, name, content],
    (error: any, results: QueryResult) => {
      if (error) throw error;
      res.status(201).send("File created successfully!");
    }
  );
};

const deleteFile = (req: Request, res: Response) => {
  const id = req.params.id;

  pool.query(queries.deleteFile, [id], (error: any, results: QueryResult) => {
    if (error) throw error;
    res.status(204).send("File deleted successfully!");
  });
};

const updateFile = (req: Request, res: Response) => {
  const id = req.params.id;
  const { content } = req.body;

  pool.query(
    queries.updateFile,
    [content, id],
    (error: any, results: QueryResult) => {
      if (error) throw error;
      res.status(201).send("File updated successfully!");
    }
  );
};

module.exports = {
  getFiles,
  addFile,
  deleteFile,
  updateFile,
};
