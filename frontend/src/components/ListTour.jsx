
// import RecommendSys from "./RecommendSys";
import RecommendTour from  "./RecommendTour";
import AboutUsSlide from "./aboutUsSlide";

import TopTour from "./TopTour";

// eslint-disable-next-line react/prop-types
export default function ListTour() {

  return (
    <div>

      {/* <RecommendSys/> */}

      <RecommendTour/>
      <TopTour />
      <AboutUsSlide/>
    </div>
  );
}
