import { createContext, useContext } from 'react';

// Create a simple payment context
const PaymentContext = createContext();

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const createSession = async () => {
    // Placeholder for payment session creation
    // In a real app, this would integrate with a payment provider like Stripe
    console.log('Creating payment session...');
    // Simulate payment success
    return Promise.resolve({ success: true });
  };

  return (
    <PaymentContext.Provider value={{ createSession }}>
      {children}
    </PaymentContext.Provider>
  );
};