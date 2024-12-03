import axios from 'axios';

import { createPayPalProduct, createPayPalPlan, createPayPalSubscription } from '../services/paypal.service.js';

export const createProduct = async (req, res) => {
    const product = {
        name: 'Subscripción SazonBox',
        description: 'Subscripción para contenido exclusivo en SazonBox',
        type: 'DIGITAL',
        category: 'FOOD_AND_DRINKS',
        image_url: 'https://drive.google.com/file/d/1k8NIWnzf8z8XDCQw218QLs6Z_Ve6sseM/view?usp=sharing'
    };

    try {
        const response = await createPayPalProduct(product, req.auth);
        res.status(201).json({ data: response });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

export const createPlan = async (req, res) => {
    const { product_id } = req.body;

    const plan = {
        name: 'PLAN mensual SazonBox',
        product_id,
        status: "ACTIVE",
        billing_cycles: [
            {
                frequency: {
                    interval_unit: "MONTH",
                    interval_count: 1
                },
                tenure_type: "REGULAR",
                sequence: 1,
                total_cycles: 12,
                pricing_scheme: {
                    fixed_price: {
                        value: "0.99",
                        currency_code: "USD"
                    }
                }
            }
        ],
        payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee: {
                value: "0.99",
                currency_code: "USD"
            },
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3
        }
    };

    try {
        const response = await createPayPalPlan(plan, req.auth);
        res.status(201).json({ data: response });
    } catch (error) {
        console.error('Error creating plan:', error.message);
        res.status(500).json({ message: 'Failed to create plan', error: error.message });
    }
};

export const generateSubscription = async (req, res) => {
    try {
        const { email_address } = req.body;

        const subscription = {
            plan_id: process.env.PAYPAL_PLAN_ID,
            start_time: new Date().toISOString(),
            quantity: 1,
            subscriber: {
                name: {
                    given_name: 'Usuario',
                    surname: 'Anónimo'
                },
                email_address: email_address || process.env.DEFAULT_EMAIL_ADDRESS
            },
            application_context: {
                return_url: process.env.RETURN_URL || 'http://localhost:5173/gracias',
                cancel_url: process.env.CANCEL_URL || 'http://localhost:5173/fallo'
            }
        };

        const response = await createPayPalSubscription(subscription, req.auth);
        res.status(201).json({ data: response });
    } catch (error) {
        console.error('Error creating subscription:', error.message);
        res.status(500).json({ message: 'Failed to create subscription', error: error.message });
    }
};