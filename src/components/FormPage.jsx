import { useState } from 'react';
import { FiCheckCircle, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const FormPage = ({
  heading,
  description,
  fields,
  cta,
  onBack,
  payment,
}) => {
  const [formState, setFormState] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [isPaid, setIsPaid] = useState(false);

  const handleChange = (event, name) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (payment && !isPaid) {
      alert('Please complete the payment to proceed.');
      return;
    }
    alert(`${heading} submitted!`);
  };

  const handlePay = () => {
    setIsPaid(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-shell">
          <button
            type="button"
            onClick={onBack}
            style={{
              background: 'transparent',
              border: '1px solid rgba(154, 208, 245, 0.35)',
              color: 'var(--pale-blue)',
              borderRadius: '999px',
              padding: '0.6rem 1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.8rem',
            }}
          >
            <FiArrowLeft /> Back
          </button>
          <h1>{heading}</h1>
          <p>{description}</p>
          <form onSubmit={handleSubmit}>
            {fields.map((field) => {
              if (field.type === 'textarea') {
                return (
                  <textarea
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formState[field.name]}
                    onChange={(event) => handleChange(event, field.name)}
                  />
                );
              }

              return (
                <input
                  key={field.name}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formState[field.name]}
                  onChange={(event) => handleChange(event, field.name)}
                />
              );
            })}
            <button type="submit" className="btn" style={{ justifySelf: 'flex-start' }}>
              {cta}
              <FiArrowRight />
            </button>
          </form>

          {payment && (
            <div className="payment-box">
              <h2>Secure Payment</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Simulate your payment to lock your spot. Once complete, we’ll confirm your booking
                instantly.
              </p>
              <button
                className="btn"
                type="button"
                onClick={handlePay}
                style={{ marginTop: '1rem' }}
              >
                Pay ₹{payment.amount}
              </button>
              {isPaid && (
                <div className="success-banner">
                  <FiCheckCircle /> {payment.successText || 'Payment Complete'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
