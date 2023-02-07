const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getFiles);
router.post("/", controller.addFile);
router.delete("/:id", controller.deleteFile);
router.put("/:id", controller.updateFile);

export { router };
