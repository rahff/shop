import { Router, Request, Response } from "express";
const router = Router();
const infos = { platform: "node.js", framework: "express", node_version: "16", express_version: "4" };


router.get('/infos', function(req: Request, res: Response) {
  res.status(200).json(infos);
});

export default router;
