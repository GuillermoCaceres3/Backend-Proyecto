import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { createProduct, createPlan, generateSubscription } from '../../controllers/paypal.controller';
import * as PayPalService from '../../services/paypal.service';

jest.mock('../../services/paypal.service');

describe('PayPal Controllers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createProduct - success', async () => {
        const req = { auth: { bearer: 'mockToken' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const mockResponse = { id: '12345', name: 'Subscripción SazonBox' };

        PayPalService.createPayPalProduct.mockResolvedValueOnce(mockResponse);

        await createProduct(req, res);

        expect(PayPalService.createPayPalProduct).toHaveBeenCalledWith(expect.any(Object), req.auth);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ data: mockResponse });
    });

    test('createProduct - failure', async () => {
        const req = { auth: { bearer: 'mockToken' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const error = new Error('Failed to create product');

        PayPalService.createPayPalProduct.mockRejectedValueOnce(error);

        await createProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Failed to create product', error: error.message });
    });
});
