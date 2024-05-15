// import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderAll from "../components/HeaderAll";

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
  return (
    <div className="bg-white  max-w-screen-2xl min-h-screen">
      <HeaderAll/>

      <div className="w-5/6 mx-auto mt-20 xl:mt-0">{children}</div>

      <Footer/>

    </div>
  );
}

export default DefaultLayout;
