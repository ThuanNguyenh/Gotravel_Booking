import RecommendTour from "./RecommendTour";
import TopTour from "./TopTour";

// eslint-disable-next-line react/prop-types
export default function ListTour() {

  return (
    <div>
      <div>
        <TopTour />
      </div>
      <div>
        <RecommendTour />
      </div>
    </div>
  );
}
