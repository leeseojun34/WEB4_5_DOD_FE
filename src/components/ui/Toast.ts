import toast from "react-hot-toast";

const Toast = (message: string) => {
  return toast(message, {
    icon: "😥",
    style: {
      borderRadius: "50px",
      background: "#fff",
      border: "1px solid var(--color-red)",
      color: "#000",
    },
  });
};
export default Toast;
