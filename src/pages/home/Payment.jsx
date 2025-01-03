import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initiatePayment } from "../../redux/features/pay/paySlice";
import Swal from "sweetalert2";

const Payment = ({ orderId }) => {
  const dispatch = useDispatch();
  const { loading, paymentStatus, checkoutUrl, qrCode, paymentError } =
    useSelector((state) => state.payment) || {};

  const handlePayment = () => {
    dispatch(initiatePayment(orderId));
  };

  // Function to open the QR code in a new window
  const openQRCodeInNewWindow = (qrCodeUrl) => {
    console.log("Opening QR Code in a new window");
    const newWindow = window.open("", "_blank", "width=500,height=500");

    if (newWindow) {
      const img = newWindow.document.createElement("img");
      img.src = qrCodeUrl;
      img.alt = "QR Code Image";
      img.style.width = "100%";

      newWindow.document.body.appendChild(img);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Popup Blocked",
        text: "Popup was blocked. Please allow popups for this site.",
        showConfirmButton: true,
      });
    }
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      Swal.fire({
        icon: "success",
        title: "Payment successfully initiated.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (paymentStatus === "failed" && paymentError) {
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: paymentError,
        showConfirmButton: true,
      });
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
                src={qrCode}
                alt="QR Code"
                className="w-40 h-40"
                onClick={() => openQRCodeInNewWindow(qrCode)}
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
