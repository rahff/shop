import { Router, Request, Response } from "express";

const router = Router();

/* GET home page. */
router.get('', function(req: Request, res: Response) {
  res.render("index");
});

router.get("/login", function(req: Request, res: Response) {
  res.render("login");
});

router.get('/register', function(req: Request, res: Response) {
  res.render("register");
});

router.get('/forgot_password', function(req: Request, res: Response) {
  res.render("forgot");
});

router.get('/cart', function(req: Request, res: Response) {
  res.render("cart");
});

export default router;
