import { useEffect, useMemo, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const FormPage = ({
  heading,
  description,
  fields,
  cta,
  onBack,
  payment,
  onPayment,
  initialValues,
}) => {
  const computedInitialState = useMemo(
    () =>
      fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: initialValues?.[field.name] ?? '',
        }),
        {}
      ),
    [fields, initialValues]
  );

  const [formState, setFormState] = useState(computedInitialState);

  useEffect(() => {
    setFormState(computedInitialState);
  }, [computedInitialState]);
  const handleChange = (event, name) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const isPaymentFlow = Boolean(payment);

  const allFieldsComplete = useMemo(
    () =>
      fields.every((field) => {
        const value = formState[field.name];
        return field.required ? value && value.toString().trim().length > 0 : true;
      }),
    [fields, formState]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPaymentFlow) return;
    alert(`${heading} submitted!`);
  };

  const handlePay = () => {
    if (!isPaymentFlow) return;
    if (!allFieldsComplete) {
      alert('Please fill all required details before proceeding to payment.');
      return;
    }

    if (typeof onPayment === 'function') {
      onPayment({
        details: formState,
        heading,
        payment,
      });
    }
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
            {!isPaymentFlow && (
              <button type="submit" className="btn" style={{ justifySelf: 'flex-start' }}>
                {cta}
                <FiArrowRight />
              </button>
            )}
          </form>

          {isPaymentFlow && (
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
                disabled={!allFieldsComplete}
              >
                Proceed to Payment – ₹{payment.amount}
                <FiArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
