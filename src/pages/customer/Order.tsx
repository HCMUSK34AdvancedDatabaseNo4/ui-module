// src/pages/Payment.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/order.css'

interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

interface OrderDetails {
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

const Order: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  // Mock order details - replace with your actual order data
  const orderDetails: OrderDetails = {
    total: 1000,
    items: [
      { id: '1', name: 'Product 1', price: 500, quantity: 1 },
      { id: '2', name: 'Product 2', price: 500, quantity: 1 },
    ],
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your payment processing logic here
      // Example API call:
      // const response = await processPayment(formData, orderDetails);

      // If payment successful
      navigate('/checkout-success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-summary">
        <h2>Order Summary</h2>
        <div className="order-items">
          {orderDetails.items.map((item) => (
            <div key={item.id} className="order-item">
              <span>{item.name}</span>
              <span>x{item.quantity}</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>
        <div className="order-total">
          <strong>Total:</strong>
          <span>${orderDetails.total}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Payment Details</h2>

        <div className="form-group">
          <label htmlFor="cardHolder">Card Holder Name</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            maxLength={16}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleInputChange}
              maxLength={5}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              maxLength={3}
              required
            />
          </div>
        </div>

        <button type="submit" className="payment-button">
          Pay ${orderDetails.total}
        </button>
      </form>
    </div>
  );
};

export default Order;
