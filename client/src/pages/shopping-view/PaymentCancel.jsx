import React from 'react';

const PaymentCancel = () => {
    const params = new URLSearchParams(window.location.search);
    const reason = params.get('reason');

    let message = "Your payment was cancelled.";
    if (reason === 'paypal_error') {
        message = "Couldn’t connect to PayPal. Please try again later.";
    } else if (reason === 'network_error') {
        message = "Network error occurred while starting payment. Please try again.";
    } else if (reason === 'missing_order') {
        message = "We couldn't find your order information.";
    } else if (reason === 'capture_failed') {
        message = "We couldn’t confirm your payment. Please contact support.";
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white px-4">
            <h1 className="text-3xl font-semibold mb-2">Payment Cancelled</h1>
            <p className="text-neutral-400 text-center max-w-md mb-4">{message}</p>
            <a href="/shop/cart" className="mt-4 bg-amber-500 text-black px-4 py-2 rounded font-medium">
                Try Again
            </a>
        </div>
    );
};

export default PaymentCancel;
