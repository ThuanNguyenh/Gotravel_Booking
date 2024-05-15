/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


const DetailTour = ({ tourId, onClose }) => {
    
    const tours = [
      { id: 1, name: "Da Nang", status: "Active", user: "John Doe", price: 100 },
      { id: 2, name: "Hue", status: "Paused", user: "Jane Doe", price: 150 },
      { id: 3, name: "Vung Tau", status: "Active", user: "Alice", price: 120 },
      { id: 4, name: "Da Lat", status: "Ongoing", user: "Bob", price: 200 },
    ];
  
    // Find the tour object based on the ID
    const selectedTour = tours.find(tour => tour.id === tourId);
  
    if (!selectedTour) {
      // Handle case when tour is not found
      return null;
    }
  
    return (
      <div className="font-semibold text-lg">
        <div>Tour Name: {selectedTour.name}</div>
        <div>Tour User: {selectedTour.user}</div>
        <div>Price: {selectedTour.price}</div>
        <div>Status: {selectedTour.status}</div>
        {/* Display other tour details */}

      </div>
    );
  };
  
  export default DetailTour;