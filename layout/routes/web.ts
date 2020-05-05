import express, { Router } from "express";

const router: Router = express.Router();

router.get('/', function (req, res, next) {
    res.send("Laress homepage");
});

export default router;