import request from 'request-promise-native';

export const createPayPalProduct = async (productData, auth) => {
    return request.post(`${process.env.PAYPAL_API}/v1/catalogs/products`, {
        auth,
        body: productData,
        json: true
    });
};

export const createPayPalPlan = async (planData, auth) => {
    return request.post(`${process.env.PAYPAL_API}/v1/billing/plans`, {
        auth,
        body: planData,
        json: true
    });
};

export const createPayPalSubscription = async (subscriptionData, auth) => {
    return request.post(`${process.env.PAYPAL_API}/v1/billing/subscriptions`, {
        auth,
        body: subscriptionData,
        json: true
    });
};
