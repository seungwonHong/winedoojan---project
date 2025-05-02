import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WineDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}
