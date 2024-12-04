import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import axios from 'axios';
import { createPayPalProduct, createPayPalPlan, createPayPalSubscription } from '../../services/paypal.service';

jest.mock('axios'); // Mocks all axios methods

describe('PayPal Services', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks entre pruebas
    });

    test('createPayPalProduct - success', async () => {
        const mockResponse = { id: '12345', name: 'Subscripción SazonBox' };
        axios.post.mockResolvedValueOnce({ data: mockResponse });

        const productData = { name: 'Test Product', description: 'Test Description' };
        const auth = { bearer: 'mockToken' };

        const result = await createPayPalProduct(productData, auth);

        expect(result).toEqual(mockResponse);
        expect(axios.post).toHaveBeenCalledWith(
            `${process.env.PAYPAL_API}/v1/catalogs/products`,
            productData,
            { headers: { Authorization: `Bearer ${auth.bearer}` } }
        );
    });

    test('createPayPalProduct - failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Request failed'));

        const productData = { name: 'Test Product', description: 'Test Description' };
        const auth = { bearer: 'mockToken' };

        await expect(createPayPalProduct(productData, auth)).rejects.toThrow('Request failed');
    });
});
