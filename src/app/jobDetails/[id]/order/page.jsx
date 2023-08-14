"use client";

import GetAllSellerJobs from "@/utils/getAllSellerJobs";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const CheckoutForm = () => {
  const { data: allJobs } = GetAllSellerJobs();
  const stripe = useStripe();
  const elements = useElements();
  const pathname = usePathname();
  const router = useRouter();
  const currentJobId = pathname.split("/")[2];
  const currentJob = allJobs?.find((job) => job.photo.includes(currentJobId));

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    const paymentForm = event.target.paymentForm;
    console.log(paymentForm);

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else if (paymentMethod.id) {
      router.push("/");
      toast.success("payment successful");
    }
  };

  return (
    <form
      name="paymentForm"
      onSubmit={handleSubmit}
      className="max-w-sm md:max-w-md mx-auto"
    >
      <h1 className="text-center mb-10 text-lg font-medium">
        Pay for: {currentJob?.title}
      </h1>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="text-center">
        <button
          type="submit"
          disabled={!stripe}
          className="bg-[#8c52ff] hover:bg-[#7A51CB] text-white font-bold py-2 px-4 rounded mt-10"
        >
          Pay
        </button>
      </div>
    </form>
  );
};

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const OrderPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default OrderPage;
