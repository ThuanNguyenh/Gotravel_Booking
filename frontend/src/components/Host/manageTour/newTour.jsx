import { useEffect, useState } from "react";
import Amenities from "../../directory/amenities";
import Category from "../../directory/category";
import { Button, Card, Input, Textarea } from "@nextui-org/react";
import { DeleteIcon } from "../../../assets/DeleteIcon";
import { PlusIcon } from "../../../assets/PlusIcon";
import SelectAddress from "../../SelectAddress";
import * as ProvinceService from "../../../services/ProvinceService";
import Rules from "../../directory/Rules";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

function NewTourForm() {
  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user.userId;

  // get accessToken from localStorage
  const token = localStorage.getItem("accessToken");

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

  // images
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  // handle remove url
  const handleRemoveUrl = (index) => {
    const newUrls1 = [...urls];
    // remove image at index
    newUrls1.splice(index, 1);

    setUrls(newUrls1);
  };

  // handle change image
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);

      setUrls((prev) => [...prev, URL.createObjectURL(newImage)]);
    }
  };

  // Images upload
  const uploadMultipleFiles = async (images) => {
    const storageRef = ref(storage); // Thay 'storage' bằng đường dẫn đến thư mục bạn muốn lưu trữ ảnh

    try {
      const uploadPromises = images.map(async (file) => {
        const imageRef = ref(storageRef, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadUrl = await getDownloadURL(imageRef);
        return downloadUrl;
      });

      const downloadUrls = await Promise.all(uploadPromises);
      return downloadUrls;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

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

  // Rule - get all rule id
  const [selectRule, setSelectRule] = useState([]);

  const handleRuleChange = (newRule) => {
    setSelectRule(newRule);
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

  // dữ liệu nhập vào
  const [dataInput, setDataInput] = useState({
    tourName: "",
    description: "",
    thumbnail: "images2",
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
        url: "image1",
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
        date: "1",
        activity: "tam bien",
      },
    ],
  });

  useEffect(() => {
    setDataInput((prevData) => ({
      ...prevData,
      province: provinceName,
      district: districtName,
      ward: wardName,
      categories: selectCate.map((id) => ({ categoryId: id })),
      utilities: selectAmen.map((id) => ({ utilityId: id })),
      rules: selectRule.map((id) => ({ ruleId: id })),
      owner: {
        userId: userId,
      },
    }));
  }, [
    provinceName,
    districtName,
    wardName,
    selectCate,
    selectAmen,
    selectRule,
    userId,
  ]);

  // input change
  const change = (e) => {
    const { name, value } = e.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  console.log("du lieu nhap vao: ", dataInput);

  // save tour
  const saveTour = async(listImage) => {
    const dataRequest = {
      ...dataInput,
      thumbnail: listImage[0],
      images: [...listImage.map((url) => ({url}))]
    };

    try {
      const response = await axios.post(`http://localhost:8080/api/v1/tour/add`,
        dataRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("ket qua da luu: ", response);
    } catch (error) {
      console.log("loi roi: ", error);
    }

  }


  // UploadAndSave
  const uploadAndSave = async (e) => {
    e.preventDefault();
    try {
      const listImage = await uploadMultipleFiles(images);
      console.log("hinh anh: ", listImage);
      await saveTour(listImage);
    } catch (error) {
      console.log("loi ", error);
    }
  }

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
          <Category Cates={handleCateChange} value={selectCate} />
          <Amenities Utils={handleAmenChange} value={selectAmen} />
          <Rules Rules={handleRuleChange} value={selectRule} />
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

        {/* DATE */}
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
              <Card className="p-2">
                <Input
                  type="date"
                  size="sm"
                  id={`schedule-date-${index}`}
                  name={`schedule-date-${index}`}
                  className="bg-slate-200 mt-1 block  rounded-md border-gray-300 "
                  value={schedule.date}
                  onChange={(e) => handleScheduleChange(index, "date", e.target.value)}
                />
                <Textarea
                  id={`schedule-activity-${index}`}
                  name={`schedule-activity-${index}`}
                  size="sm"
                  placeholder="Your Schedule"
                  className="bg-slate-200 mt-1 block  rounded-md border-gray-300"
                  value={schedule.activity}
                  onChange={(e) => handleScheduleChange(index, "activity", e.target.value)}
                ></Textarea>
              </Card>
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

        {/* Images */}
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
            onChange={handleChange}
            name="thumbnail"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="py-2 grid grid-cols-3 gap-4">
          {urls?.map((url, index) => (
            <div key={index} className="relative sm:col-span-2">
              <button
                onClick={() => handleRemoveUrl(index)}
                className="bg-pink-600 absolute right-0"
              >
                <XMarkIcon className="w-7 text-white" />
              </button>
              <img className="h-96 border w-full" src={url} alt="preview" />
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div>
          <button
            onClick={uploadAndSave}
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
