const Service = require('../../models/Shop/serviceModel');

// @desc    Add new service
// @route   POST /api/services
exports.addService = async (req, res) => {
    try {

        const { email, userId } = req.body;

        // Validate
        if (!email || !userId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Missing email or userId."
            });
        }


        // Check if email already exists
        const exists = await Service.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "This email is already subscribed."
            });
        }

        const newService = new Service({ userId, email });
        await newService.save();

        res.status(201).json({
            message: "Successfully subscribed.",
            success: true,
            error: false

        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "Something went wrong while subscribing."
        });
    }
};


exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('userId', 'userName email');


        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "Failed to fetch subscribers."
        });
    }
};

// @desc    Delete a service by ID
// @route   DELETE /api/services/:id
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Subscriber not found."
            });
        }

        await service.deleteOne();

        res.json({

            success: true,
            error: false,
            message: "Subscriber removed."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "Error removing subscriber."
        });
    }
};
