import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function DoctorsLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
