import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controllers.js";

const router = Router()

// /api/v1/healthcheck
router.route("/").get(healthcheck)

export default router