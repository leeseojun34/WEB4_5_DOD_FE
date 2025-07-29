import toast from "react-hot-toast";

export const ToastWell = (icon: string, message: string) => {
  return toast(message, {
    icon: icon,
    style: {
      borderRadius: "50px",
      background: "rgba(255, 255, 255, 0.9)",
      color: "var(--color-primary-400)",
      border: "1px solid var(--color-primary-400)",
      boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
      padding: "8px 16px",
    },
  });
};
export default ToastWell;
