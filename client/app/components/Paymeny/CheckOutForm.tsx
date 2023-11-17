import React, { FC, useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { styles } from "@/app/styles/style";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  setOpen: any;
  data: any;
};

const CheckOutForm: FC<Props> = ({ data, setOpen }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    }
  };

  // TODO chequear por que no redirije al curso despues de comprarlo

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      redirect(`/course-access/${data._id}`);
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [orderData, error]);

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="flex flex-col justify-center gap-2">
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" />

        <button disabled={isLoading || !stripe || !elements} id="submite">
          <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
            {isLoading ? "Paying..." : "Pay now"}
          </span>
        </button>

        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="text-red-700 font-Poppins pt-3">
            {message}
          </div>
        )}
      </div>
    </form>
  );
};

export default CheckOutForm;
