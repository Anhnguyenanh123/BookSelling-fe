import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initiatePayment } from "../../redux/features/pay/paySlice";

const Payment = ({ orderId }) => {
  const dispatch = useDispatch();
  const { loading, paymentStatus, checkoutUrl, qrCode, paymentError } =
    useSelector((state) => state.payment) || {};

  // Handle the Pay button click
  const handlePayment = () => {
    dispatch(initiatePayment(orderId)); // Initiate the payment process
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      alert("Payment successfully initiated.");
    } else if (paymentStatus === "failed" && paymentError) {
      alert(`Payment failed: ${paymentError}`);
    }
  }, [paymentStatus, paymentError]);

  return (
    <div>
      <button
        onClick={handlePayment}
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay"}
      </button>

      {paymentStatus === "PENDING" && (
        <div className="mt-6">
          <p className="text-lg">
            Please complete your payment by clicking the link below:
          </p>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Proceed to Payment
          </a>

          {qrCode && (
            <div className="mt-4">
              <h4 className="text-lg">Scan this QR Code to pay:</h4>
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="QR Code"
                className="w-40 h-40"
              />
            </div>
          )}
        </div>
      )}

      {paymentStatus === "failed" && (
        <div className="mt-6 text-red-500">
          <p>Payment failed. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
