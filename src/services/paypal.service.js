import axios from 'axios';

export const createPayPalProduct = async (productData, auth) => {
    try {
        const response = await axios.post(
            `${process.env.PAYPAL_API}/v1/catalogs/products`,
            JSON.stringify(productData),
            {
                headers: {
                    Authorization: `Bearer ${auth.bearer}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating PayPal product:', error.message);
        throw error;
    }
};

export const createPayPalPlan = async (planData, auth) => {
    try {
        const response = await axios.post(
            `${process.env.PAYPAL_API}/v1/billing/plans`,
            planData,
            {
                headers: {
                    Authorization: `Bearer ${auth.bearer}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating PayPal plan:', error.message);
        throw error;
    }
};

export const createPayPalSubscription = async (subscriptionData, auth) => {
    try {
        const response = await axios.post(
            `${process.env.PAYPAL_API}/v1/billing/subscriptions`,
            JSON.stringify(subscriptionData),
            {
                headers: {
                    Authorization: `Bearer ${auth.bearer}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating PayPal subscription:', error.message);
        throw error;
    }
};

export const createPayPalOrder = async (orderData, auth) => {

    try {
        const { data } = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, JSON.stringify(orderData),
            {
                headers: {
                    Authorization: `Bearer ${auth.bearer}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return data;
    } catch (error) {
        console.error("Error creating PayPal order:", error.message);
        throw new Error("Failed to create PayPal order");
    }
};

export const capturePayPalOrder = async (token, accessToken) => {
    try {
        const { data } = await axios.post(
            `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        
    } catch (error) {
        console.error("Error capturing PayPal order:", error.response?.data || error.message);
        throw new Error("Failed to capture PayPal order");
    }
};