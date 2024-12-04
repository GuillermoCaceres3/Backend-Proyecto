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