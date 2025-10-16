import { useEffect, useMemo, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiHome } from 'react-icons/fi';

const PaymentPage = ({ session, onBack, onComplete, onReset }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(session?.status === 'success');

  useEffect(() => {
    setIsSuccess(session?.status === 'success');
  }, [session]);

  const summaryFields = useMemo(() => {
    if (!session?.details) return [];
    return Object.entries(session.details)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        const spaced = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ');
        const label = spaced.replace(/^\w|\s\w/g, (match) => match.toUpperCase());
        return { key, label, value };
      });
  }, [session]);

  const beginPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }, 1400);
  };

  const handleFinish = () => {
    if (typeof onReset === 'function') {
      onReset();
    }
  };

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-shell">
          <button type="button" className="ghost-btn" onClick={onBack}>
            <FiArrowLeft /> Edit Details
          </button>
          <div className="payment-header">
            <span className="payment-tag">Simulated Checkout</span>
            <h1>{session?.heading || 'Complete Payment'}</h1>
            <p>
              Confirm your information and complete the simulated payment to secure your spot at
              Madooza.
            </p>
          </div>

          <div className="payment-grid">
            <div className="payment-card electric-border">
              <div className="card-title">Your Details</div>
              <ul>
                {summaryFields.map(({ key, label, value }) => (
                  <li key={key}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="payment-card highlight">
              <div className="card-title">Payment Summary</div>
              <div className="amount">
                <span>Total Due</span>
                <strong>₹{session?.payment?.amount ?? 0}</strong>
              </div>
              {!isSuccess ? (
                <button
                  type="button"
                  className="btn"
                  onClick={beginPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing…' : 'Complete Payment'}
                  <FiArrowRight />
                </button>
              ) : (
                <div className="success-panel">
                  <div className="pulse" aria-hidden="true" />
                  <h2>{session?.payment?.successText || 'Payment Complete'}</h2>
                  <p>You’re locked in. Watch your inbox for confirmation and event updates.</p>
                  <div className="success-actions">
                    <button type="button" className="btn secondary" onClick={handleFinish}>
                      <FiHome /> Return Home
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
