import toast from "react-hot-toast";

const Toast = (message: string) => {
  return toast(message, {
    icon: "😥",
    style: {
      borderRadius: "50px",
      background: "rgba(255, 255, 255, 0.9)",
      color: "var(--color-red)",
      border: "1px solid var(--color-red)",
      boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
      padding: "8px 16px",
    },
  });
};
export default Toast;
