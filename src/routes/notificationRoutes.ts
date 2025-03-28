import { Router } from "express"

import notificationController from "../controllers/notificationController"

const router = Router()

/**
 * @swagger
 * /api/notifications/send:
 *   post:
 *     summary: Send a notification (email or SMS)
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NotificationRequest'
 *           encoding:
 *             attachment:
 *               contentType: application/octet-stream
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotificationResponse'
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/send", notificationController.sendNotification)

export default router
