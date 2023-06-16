import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import useCart from "../../hooks/useCart";
import { FaCreditCard } from "react-icons/fa";

const stripePromise = loadStripe(
  "pk_test_51NG3SmLgyMzNaT8nubRFvZqR2XJ6NCl38mbjZGloJhZbobg8y146N1WcSEORegXBEadbZwE8X2LFFJ0DM2PwPAy900bg8iBuGb"
);

const Payment = () => {
  const [cart] = useCart();
  const price = localStorage.getItem("price");

  return (
    <div className="pt-8">
      <div className="text-3xl font-bold mb-8 text-center">Payment</div>
      <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center mb-6">
          <FaCreditCard className="text-3xl text-blue-500 mr-4" />
          <h2 className="text-xl font-bold">Total Amount: ${price}</h2>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm cart={cart} price={price} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
