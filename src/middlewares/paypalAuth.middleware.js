import axios from 'axios';

let cachedToken = null;
let tokenExpiry = null;

const getPayPalAuth = async (req, res, next) => {
    const now = Date.now();
    if (cachedToken && tokenExpiry && now < tokenExpiry) {
        req.auth = { bearer: cachedToken };
        return next();
    }

    try {
        const response = await axios.post(
            `${process.env.PAYPAL_API}/v1/oauth2/token`,
            new URLSearchParams({ grant_type: 'client_credentials' }),
            {
                auth: {
                    username: process.env.PAYPAL_CLIENT_ID,
                    password: process.env.PAYPAL_SECRET,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        cachedToken = response.data.access_token;
        tokenExpiry = now + response.data.expires_in * 1000;
        req.auth = { bearer: cachedToken };
        next();
    } catch (error) {
        console.error('Error obtaining PayPal token:', error.message);
        res.status(500).json({
            message: 'Failed to authenticate with PayPal',
            error: error.message,
            status: error.response?.status,
            response: error.response?.data,
        });
    }
};

export default getPayPalAuth;