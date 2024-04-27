function NewTourForm() {
  return (
    <div className="mx-auto p-8 bg-[#73D8FC]">
      <h1 className="text-2xl font-semibold text-center">Create Tour</h1>
      <form>
        {/* Tour Name */}
        <div className="mb-4">
          <label
            htmlFor="tourName"
            className="block text-sm font-medium text-gray-700"
          >
            Tour Name
          </label>
          <input
            type="text"
            id="tourName"
            name="tour_name" // Update name attribute to match the field name
            className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description" // Update name attribute to match the field name
            rows="2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>
        {/* Amenities*/}
        <div className="mb-4">
          <label
            htmlFor="amenities"
            className="block text-sm font-medium text-gray-700"
          >
            Amenities
          </label>
          <div className="flex gap-1">
          <input
            type="radio"
            id="amenities"
            name="amenities"
            value="Wifi" // Update name attribute to match the field name
            className="form-radio h-5 w-5 inline-flex items-center"/>
            <span className="mr-2">Wifi</span>
          <input
          type="radio"
          id="amenities"
          name="amenities"
          value="Wifi" // Update name attribute to match the field name
          className="form-radio h-5 w-5 inline-flex items-center"/>
          <span className="mr-2">Pool</span>
          <input
          type="radio"
          id="amenities"
          name="amenities"
          value="Wifi" // Update name attribute to match the field name
          className="form-radio h-5 w-5 inline-flex items-center"/>
          <span className="mr-2">Gym</span>
          <input
          type="radio"
          id="amenities"
          name="amenities"
          value="Wifi" // Update name attribute to match the field name
          className="form-radio h-5 w-5 inline-flex items-center"/>
          <span className="mr-2">Massage</span>
          </div>
          
        </div>
        {/* Genre */}
        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre" // Update name attribute to match the field name
            className="mt-1 block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></input>
        </div>
        <div className="flex gap-2">
          {/* Discount */}
          <div className="mb-4">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount %
            </label>
            <input
              type="number"
              id="discount"
              name="discount" // Update name attribute to match the field name
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price" // Update name attribute to match the field name
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        {/* Number of Guests */}
        <div className="mb-4">
          <label
            htmlFor="numGuest"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Guests
          </label>
          <input
            type="number"
            id="numGuest"
            name="num_guest" // Update name attribute to match the field name
            className="mt-1 block w-1/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex gap-2">
          {/* Start Date */}
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="start_date" // Update name attribute to match the field name
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {/* End Date */}
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="end_date" // Update name attribute to match the field name
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        {/* Thumbnail */}
        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail" // Update name attribute to match the field name
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="flex gap-2">
          {/* Detail Address */}
          <div className="mb-4">
            <label
              htmlFor="detailAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Detail Address
            </label>
            <input
              type="text"
              id="detailAddress"
              name="detail_address" // Update name attribute to match the field name
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {/* District */}
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              name="district" // Update name attribute to match the field name
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {/* Ward */}
          <div className="mb-4">
            <label
              htmlFor="ward"
              className="block text-sm font-medium text-gray-700"
            >
              Ward
            </label>
            <input
              type="text"
              id="ward"
              name="ward" // Update name attribute to match the field name
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          {/* Province */}
          <div className="mb-4">
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >
              Province
            </label>
            <input
              type="text"
              id="province"
              name="province" // Update name attribute to match the field name
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Tour
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTourForm;
