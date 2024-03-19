import {Router} from 'express';
import { allPayments, buysubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router=Router();
router.route('/razorpay-key')
.get(isLoggedIn,getRazorpayApiKey);
router
.route('/subscribe')
.post(isLoggedIn,buysubscription)
router
.route('/verify').post(isLoggedIn,verifySubscription)
router.route('/unsubscribe')
.post(isLoggedIn,cancelSubscription)
router.post('/')
.get(isLoggedIn,authorizedRoles('ADMIN'),allPayments);
export default router;