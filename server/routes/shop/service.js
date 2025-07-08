const express = require('express');
const router = express.Router();
const { addService, getAllServices, deleteService } = require('../../controllers/shop/service');

router.post('/add_service_email', addService);
router.get('/get_all_service_email', getAllServices);
router.delete('/delete_service_email_by_userId/:id', deleteService);

module.exports = router;
