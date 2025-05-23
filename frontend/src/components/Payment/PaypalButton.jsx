import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { Alert } from "../Alert/Alert";

const PaypalButton = () => {
  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/paypal/pay",
        null,
        {
          params: {
            sum: 100.0,
          },
        }
      );

      // Kiểm tra phản hồi từ backend và lấy approval URL
      if (response.data && response.data.approval_url) {
        console.log("Approval URL: ", response.data.approval_url);
        // Trả về token từ approval URL
        const urlParams = new URLSearchParams(
          new URL(response.data.approval_url).search
        );
        return urlParams.get("token");
      } else {
        throw new Error("Không nhận được approval URL từ backend");
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng PayPal: ", error);
      alert("Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.");
    }
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then((details) => {
      // alert("Giao dịch hoàn tất bởi " + details.payer.name.given_name);
      

      console.log(details);

      Alert(2000, "Thanh toán", "Thanh toán thành công", "success");

    });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AVtXUURfTwFbScsjHD1paoY4V2IRz9pmwr9zsslMifzLrskGSgS_6QeyUSYyQbBKSyb7IPJOCCkK2bjR",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
