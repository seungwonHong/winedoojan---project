import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        theme="light"
      />
    </>
  );
}
