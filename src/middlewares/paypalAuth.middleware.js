import axios from 'axios';

const getPayPalAuth = async (req, res, next) => {
    try {
        const response = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, new URLSearchParams({
            grant_type: 'client_credentials'
        }), {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET
            }
        });
        req.auth = { bearer: response.data.access_token };
        next();
    } catch (error) {
        console.error('Error obtaining PayPal token:', error.message);
        res.status(500).json({ 
            message: 'Failed to authenticate with PayPal', 
            error: error.message,
            status: error.response?.status,
            response: error.response?.data
        });
    }
};

export default getPayPalAuth;
