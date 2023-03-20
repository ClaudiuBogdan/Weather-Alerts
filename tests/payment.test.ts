import { createInvoice } from '../src/payment';

describe('createInvoice', () => {
  test('should create a valid invoice object', () => {
    const invoice = createInvoice(
      'Test Invoice',
      'Test description',
      'test_payload',
      'test_provider_token',
      'test_start_parameter',
      'USD',
      [{ label: 'Test Item', amount: 100 }]
    );

    expect(invoice).toEqual({
      title: 'Test Invoice',
      description: 'Test description',
      payload: 'test_payload',
      provider_token: 'test_provider_token',
      start_parameter: 'test_start_parameter',
      currency: 'USD',
      prices: [{ label: 'Test Item', amount: 100 }],
    });
  });
});
