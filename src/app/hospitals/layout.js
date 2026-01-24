import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function HospitalsLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
