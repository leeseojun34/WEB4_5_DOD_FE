import toast from "react-hot-toast";

export const ToastWell = (icon: string, message: string) => {
  return toast(message, {
    icon: icon,
    style: {
      borderRadius: "50px",
      background: "var(--color-white)",
      border: "1px solid var(--color-primary-400)",
      color: "var(--color-primary-400)",
    },
  });
};
export default ToastWell;
