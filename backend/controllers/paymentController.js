// controllers/paymentController.js
import axios from 'axios';

export const createCashfreeOrder = async (req, res) => {
  try {
    const orderId = `ORDER_${Date.now()}`;
    const { name, email, phone, _id } = req.user;

    const requestBody = {
      order_id: orderId,
      order_amount: 499,
      order_currency: 'INR',
      customer_details: {
        customer_id: _id.toString(),
        customer_email: email,
        customer_name: name,
        customer_phone: phone?.toString() || '9999999999'
      }
    };

    console.log('▶️ Request Body to Cashfree:', requestBody);

    const response = await axios.post(
      'https://sandbox.cashfree.com/pg/orders',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-version': '2022-09-01',
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        }
      }
    );

    console.log('✅ Cashfree Response:', response.data);

    const orderToken = response.data.payment_session_id;

    if (!orderToken) {
      return res.status(500).json({
        error: 'Order token not returned from Cashfree',
        details: response.data
      });
    }

    res.status(200).json({
      orderId,
      orderToken
    });

  } catch (error) {
    console.error('❌ Order creation failed:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to create order',
      details: error.response?.data || error.message
    });
  }
};
