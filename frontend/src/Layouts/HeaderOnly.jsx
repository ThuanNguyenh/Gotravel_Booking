import Footer from "../Layouts/components/Footer";
import Header from "../Layouts/components/Header";

// eslint-disable-next-line react/prop-types
function HeaderOnly({ children }) {

  return (
    <div className="bg-white max-w-screen-2xl min-h-screen">
      <Header/>

      <div className="w-5/6 mx-auto mt-20">{children}</div>

      <Footer />
    </div>
  );
}

export default HeaderOnly;
