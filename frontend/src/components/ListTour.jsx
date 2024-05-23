import AboutUsSlide from "./AboutUsSlide";
import RecommendSys from "./RecommendSys";
import RecommendTour from "./RecommendTour";

import TopTour from "./TopTour";

// eslint-disable-next-line react/prop-types
export default function ListTour() {

  return (
    <div>
      <div>
        <RecommendSys />
      </div>
      <div>
        <RecommendTour />
      </div>
      <div>
        <TopTour />
      </div>
      <div>
        <AboutUsSlide/>
      </div>
     
    </div>
  );
}
