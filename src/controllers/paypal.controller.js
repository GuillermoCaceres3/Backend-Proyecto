import { createPayPalProduct, createPayPalPlan, createPayPalSubscription } from '../services/paypal.service.js';

export const createProduct = async (req, res) => {
    const product = {
        "name": "Subscripción SazonBox",
        "type": "DIGITAL",
        "description": "Subscripción para contenido exclusivo en SazonBox",
        "category": "FOOD_DRINK_AND_NUTRITION",
        "image_url": "https://drive.google.com/uc?id=1k8NIWnzf8z8XDCQw218QLs6Z_Ve6sseM",
        "home_url": "https://sazonbox.me"
    };

    try {
        const response = await createPayPalProduct(product, req.auth);
        res.status(201).json({ data: response });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({
            message: 'Failed to create product',
            error: error.message,
            details: error.response?.data,
        });
    }
};

export const createPlan = async (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required to create a plan.' });
    }

    const plan = {
        product_id: product_id,
        name: 'PLAN mensual SazonBox',
        status: "ACTIVE",
        billing_cycles: [
            {
                frequency: {
                    interval_unit: "MONTH",
                    interval_count: 1,
                },
                tenure_type: "REGULAR",
                sequence: 1,
                total_cycles: 12,
                pricing_scheme: {
                    fixed_price: {
                        value: "0.99",
                        currency_code: "USD",
                    },
                },
            },
        ],
        payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3,
        },
    };

    try {
        const response = await createPayPalPlan(plan, req.auth);
        res.status(201).json({ message: 'Plan created successfully', data: response });
    } catch (error) {
        console.error('Error creating plan:', error.message);
        res.status(500).json({
            message: 'Failed to create plan',
            error: error.message,
            details: error.response?.data,
        });
    }
};

export const generateSubscription = async (req, res) => {
    const { email_address } = req.body;

    const startTime = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // Start in 5 minutes from now

    const subscription = {
        plan_id: process.env.PAYPAL_PLAN_ID,
        start_time: startTime,
        quantity: 1,
        subscriber: {
            name: {
                given_name: 'Usuario',
                surname: 'Anónimo',
            },
            email_address: email_address || process.env.DEFAULT_EMAIL_ADDRESS,
        },
        application_context: {
            brand_name: "SazonBox",
            user_action: "SUBSCRIBE_NOW",
            return_url: process.env.RETURN_URL,
            cancel_url: process.env.CANCEL_URL,
        },
    };

    try {
        const response = await createPayPalSubscription(subscription, req.auth);

        const approvalUrl = response.links.find(link => link.rel === 'approve')?.href;

        if (!approvalUrl) {
            return res.status(500).json({
                message: 'Approval URL not found in PayPal response',
                details: response,
            });
        }

        res.status(201).json({
            message: 'Subscription created successfully',
            data: { approvalUrl },
        });
    } catch (error) {
        console.error('Error creating subscription:', error.message);
        res.status(500).json({
            message: 'Failed to create subscription',
            error: error.message,
            details: error.response?.data,
        });
    }
};
