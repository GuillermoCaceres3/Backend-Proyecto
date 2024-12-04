import express from 'express';
import { createProduct, createPlan, generateSubscription } from '../controllers/paypal.controller.js';
import getPayPalAuth from '../middlewares/paypalAuth.middleware.js';

const router = express.Router();

router.post('/create-product', getPayPalAuth, createProduct);
router.post('/create-plan', getPayPalAuth, createPlan);
router.post('/create-subscription', getPayPalAuth, generateSubscription);

router.get('/test-auth', getPayPalAuth, (req, res) => {
    res.json({ message: 'Authentication successful', token: req.auth.bearer });
});

export default router;
