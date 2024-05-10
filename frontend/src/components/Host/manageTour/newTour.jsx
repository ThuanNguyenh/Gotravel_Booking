import { useEffect, useState } from "react";
import Amenities from "../amenities";
import Category from "../category";
import { Button } from "@nextui-org/react";
import { DeleteIcon } from "../../../assets/DeleteIcon";
import { PlusIcon } from "../../../assets/PlusIcon";
import SelectAddress from "../../SelectAddress";
import * as ProvinceService from "../../../services/ProvinceService";

function NewTourForm() {
  // address
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  // chuyen tu object sang mang
  const ArrayProVince = Object.values(provinces);
  const ArrayDistrict = Object.values(districts);
  const ArrayWard = Object.values(wards);

  // get provinceName - districtName - wardName
  useEffect(() => {
    const selectProvince = provinces.find((p) => p.province_id === province);
    const selectDistrict = districts.find((d) => d.district_id === district);
    const selectWard = wards.find((w) => w.ward_id === ward);

    if (selectProvince) {
      setProvinceName(selectProvince.province_name);
    }
    if (selectDistrict) {
      setDistrictName(selectDistrict.district_name);
    }

    if (selectWard) {
      setWardName(selectWard.ward_name);
    }
  }, [province, provinces, districts, district, wards, ward]);

  //   Tỉnh / thành phố
  useEffect(() => {
    const resultProvince = async () => {
      const result = await ProvinceService.resProvince();
      if (result.status === 200) {
        setProvinces(result?.data.results);
      }
    };

    resultProvince();
  }, []);

  //   quận / huyện
  useEffect(() => {
    const resultDistrict = async () => {
      const result = await ProvinceService.resDistrict(province);

      if (result.status === 200) {
        setDistricts(result.data?.results);
      }
    };

    province && resultDistrict(province);
  }, [province, district]);

  // xã / thị trấn
  useEffect(() => {
    const resultWard = async () => {
      const result = await ProvinceService.resWard(district);

      if (result.status === 200) {
        setWards(result.data?.results);
      }
    };

    district && resultWard(district);
  }, [district, ward]);

  // dữ liệu nhập vào
  const [dataInput, setDataInput] = useState({
    tourName: "",
    description: "",
    thumbnail: "",
    province: "",
    district: "",
    ward: "",
    detailAddress: "",
    price: "",
    numGuest: "",
    discount: "",
    startDate: "",
    endDate: "",
    owner: {
      userId: "",
    },
    images: [
      {
        url: "",
      },
    ],
    categories: [
      {
        categoryId: "",
      },
    ],
    utilities: [
      {
        utilityId: "",
      },
    ],
    rules: [
      {
        ruleId: "",
      },
    ],
    schedules: [
      {
        date: "",
        activity: "",
      },
    ],
  });

  useEffect(() => {
    setDataInput((prevData) => ({
      ...prevData,
      province: provinceName,
      district: districtName,
      ward: wardName,
    }));
  }, [provinceName, districtName, wardName]);

  // input change
  const change = (e) => {
    const { name, value } = e.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  console.log("du lieu nhap vao: ", dataInput);

  // Utilities - get all util id
  const [selectAmen, setSelectAmen] = useState([]);

  const handleAmenChange = (newAmen) => {
    setSelectAmen(newAmen);
  };

  // Category - get all category id
  const [selectCate, setSelectCate] = useState([]);

  const handleCateChange = (newCate) => {
    setSelectCate(newCate);
  };

  //Schedule
  const [schedules, setSchedules] = useState([""]); // State to store schedules

  // Function to handle adding a new schedule field
  const handleAddSchedule = () => {
    setSchedules([...schedules, ""]);
  };

  // Function to handle updating schedule value
  const handleScheduleChange = (index, value) => {
    const newSchedules = [...schedules];
    newSchedules[index] = value;
    setSchedules(newSchedules);
  };

  // Function to handle removing a schedule field
  const handleRemoveSchedule = (index) => {
    const newSchedules = [...schedules];
    newSchedules.splice(index, 1);
    setSchedules(newSchedules);
  };

  return (
    <div className="mx-auto p-8">
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
            onChange={change}
            type="text"
            id="tourName"
            name="tourName" // Update name attribute to match the field name
            className="bg-slate-200 mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            onChange={change}
            name="description" // Update name attribute to match the field name
            rows="2"
            className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div className="flex gap-2">
          {/* Province */}
          <SelectAddress
            value={province}
            setValue={setProvince}
            AutocompleteItems={ArrayProVince}
            label="Tỉnh / Thành phố"
            type="province"
            name="province"
            onChange={change}
          />

          {/* District */}
          <SelectAddress
            value={district}
            setValue={setDistrict}
            AutocompleteItems={ArrayDistrict}
            label="Quận / Huyện"
            type="district"
            name="district"
            onChange={change}
          />

          {/* Ward */}
          <SelectAddress
            value={ward}
            setValue={setWard}
            AutocompleteItems={ArrayWard}
            type="ward"
            label="Xã / Thị trấn"
            name="ward"
            onChange={change}
          />

          {/* Detail Address */}
          <div className="mb-4">
            <label
              htmlFor="detailAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Detail Address
            </label>
            <input
              onChange={change}
              type="text"
              id="detailAddress"
              name="detailAddress" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Amenities*/}
        <div className="mb-4 flex gap-5">
          <Amenities Utils={handleAmenChange} value={selectAmen} />
          <Category Cates={handleCateChange} value={selectCate} />
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
              onChange={change}
              type="number"
              id="discount"
              name="discount" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              onChange={change}
              type="number"
              id="price"
              name="price" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            onChange={change}
            type="number"
            id="numGuest"
            name="numGuest" // Update name attribute to match the field name
            className="bg-slate-200 mt-1 block w-1/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        {/*  */}
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
              onChange={change}
              type="date"
              id="startDate"
              name="startDate" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              onChange={change}
              type="date"
              id="endDate"
              name="endDate" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-4">
          <label
            htmlFor="schedule"
            className="block text-sm font-medium text-gray-700"
          >
            Schedule
          </label>
          {schedules.map((schedule, index) => (
            <div key={index} className="mb-4 flex items-center gap-1">
              <textarea
                id={`schedule-${index}`}
                name={`schedule-${index}`}
                rows="2"
                className="bg-slate-200 mt-1 block w-[30%] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={schedule}
                onChange={(e) => handleScheduleChange(index, e.target.value)}
              ></textarea>
              {index > 0 && (
                <Button
                  color="danger"
                  size="sm"
                  isIconOnly
                  className="remove-schedule-btn"
                  onClick={() => handleRemoveSchedule(index)}
                >
                  <DeleteIcon />
                </Button>
              )}
            </div>
          ))}
          <Button
            isIconOnly
            color="primary"
            className="add-schedule-btn"
            onClick={handleAddSchedule}
          >
            <PlusIcon />
          </Button>
        </div>

        {/* Thumbnail */}
        <div className="mb-4">
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700"
          >
            Images
          </label>
          <input
            type="file"
            multiple // Allow multiple file selection
            id="thumbnail"
            // onChange={handleThumbnailChange}
            name="thumbnail"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="py-2 grid grid-cols-3 gap-4">
          {/* {thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className="rounded-md border-gray-300 shadow-sm"
            />
          ))} */}
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
