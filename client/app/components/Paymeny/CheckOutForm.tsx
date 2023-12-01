import { styles } from "@/app/styles/style";
import { FC, useState, useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const CheckOutForm: FC<Props> = ({ data, setOpen, user }) => {
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
      setMessage("Payment Success");
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      socketId.emit("notification", {
        title: "New Order",
        message: `You have a new order from ${data.name}`,
        userId: user._id,
      });
      redirect(`/thank-you`);
    }
    if (error && "data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [orderData, error]);

  return (
    <form
      onSubmit={handleSubmit}
      id="payment-form"
      className="flex flex-col h-full"
    >
      <div className="flex-grow gap-2 min-h-[350px]">
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" />
      </div>
      <div>
        <button disabled={isLoading || !stripe || !elements} id="submite">
          <span id="button-text" className={`${styles.button} mt-5 !h-[35px]`}>
            {isLoading ? "Paying..." : "Pay now"}
          </span>
          {message && (
            <div
              id="payment-message"
              className="text-cyan-900 font-Poppins pt-3 text-center"
            >
              {message}
            </div>
          )}
        </button>

        {/* Show any error or success messages */}
      </div>
    </form>
  );
};

export default CheckOutForm;
