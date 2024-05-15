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
import { Alert } from "../../Alert/Alert";
import "../../../index.css"

function NewTourForm() {
  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

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
  const [schedules, setSchedules] = useState([{ date: "", activities: [""] }]); // State to store schedules

  // Function to handle adding a new schedule field
  const handleAddSchedule = () => {
    setSchedules([...schedules, { date: "", activities: [""] }]);
  };

  // Function to handle updating schedule value
  const handleScheduleChange = (index, field, value) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = value;
    setSchedules(newSchedules);
  };

  // Function to handle removing a schedule field
  const handleRemoveSchedule = (index) => {
    const newSchedules = [...schedules];
    newSchedules.splice(index, 1);
    setSchedules(newSchedules);
  };

  // Function to handle adding a new activity for a specific date
  const handleAddActivity = (index) => {
    const newSchedules = [...schedules];
    newSchedules[index].activities.push("");
    setSchedules(newSchedules);
  };

  // Function to handle removing an activity for a specific date
  const handleRemoveActivity = (dateIndex, activityIndex) => {
    const newSchedules = [...schedules];
    newSchedules[dateIndex].activities.splice(activityIndex, 1);
    setSchedules(newSchedules);
  };

  // Function to handle updating activity value for a specific date
  const handleActivityChange = (dateIndex, activityIndex, value) => {
    const newSchedules = [...schedules];
    newSchedules[dateIndex].activities[activityIndex] = value;
    setSchedules(newSchedules);
  };

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
        date: 0,
        activities: [
          {
            context: "",
          },
        ],
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
      schedules: schedules,
    }));
  }, [
    provinceName,
    districtName,
    wardName,
    selectCate,
    selectAmen,
    selectRule,
    userId,
    schedules,
  ]);

  // input change
  const change = (e) => {
    const { name, value } = e.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };

  // message
  const [message, setMessage] = useState("vui lòng điền đầy đủ thông tin");

  // save tour
  const saveTour = async (listImage) => {
    const dataRequest = {
      ...dataInput,
      thumbnail: listImage[0],
      images: [...listImage.map((url) => ({ url }))],
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/tour/add`,
        dataRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ket qua da luu: ", response);
    } catch (error) {
      console.log("loi roi: ", error);
      setMessage(error?.response.data);
      alert(message);
    }
  };

  // UploadAndSave
  const uploadAndSave = async (e) => {
    e.preventDefault();
    try {
      const listImage = await uploadMultipleFiles(images);
      await saveTour(listImage);
      // Alert(2000, "Tạo tour", "Thành công", "success", "OK");
    } catch (error) {
      Alert(2000, "Tạo tour", "Thất bại", "error", "OK");
    }
  };

  return (
    <div className="mx-auto p-8">
      <h1 className="text-2xl font-semibold text-center">Create Tour</h1>
      <form >
        {/* Tour Name */}
        <div className="mb-4">
          <Input
            label="Tên tour"
            onChange={change}
            required
            type="text"
            id="tourName"
            name="tourName" // Update name attribute to match the field name
            className="bg-slate-200 mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm"
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <Textarea
            label="Mô tả"
            id="description"
            required
            onChange={change}
            name="description" // Update name attribute to match the field name
            className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          ></Textarea>
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
          <div className="">
            <Input
              label="Địa chỉ chi tiết"
              onChange={change}
              required
              type="text"
              id="detailAddress"
              name="detailAddress" // Update name attribute to match the field name
              className="bg-slate-200 block w-full rounded-md border-gray-300 shadow-sm"
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

          {/* Number of Guests */}
          <div className="mb-4">
            <Input
              label="Số lượng khách"
              onChange={change}
              required
              type="number"
              id="numGuest"
              name="numGuest" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <Input
              label="Giảm giá %"
              onChange={change}
              type="number"
              id="discount"
              name="discount" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          {/* Price */}
          <div className="mb-4">
            <Input
              label="Giá tour"
              onChange={change}
              required
              type="number"
              id="price"
              name="price" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>


        {/* DATE */}
        <div className="flex gap-2">
          {/* Start Date */}
          <div className="mb-4">
            <Input
              label="Ngày đi"
              onChange={change}
              required
              placeholder="date"
              type="date"
              id="startDate"
              name="startDate" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          {/* End Date */}
          <div className="mb-4">
            <Input
              label="Ngày về"
              placeholder="date"
              onChange={change}
              required
              type="date"
              id="endDate"
              name="endDate" // Update name attribute to match the field name
              className="bg-slate-200 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-4 w-[30%] flex flex-col justify-center">
          {schedules?.map((schedule, dateIndex) => (
            <div key={dateIndex} className="mb-4 flex items-center gap-3">
              <Card className="p-2 w-full items-center">
                <div className="text-center font-semibold">Hoạt động {dateIndex+1}</div>
                <Input
                  type="number"
                  size="sm"
                  placeholder="Ngày"
                  id={`schedule-date-${dateIndex}`}
                  name={`schedule-date-${dateIndex}`}
                  className="bg-slate-200 mt-1 block rounded-md"
                  value={schedule.date}
                  onChange={(e) =>
                    handleScheduleChange(dateIndex, "date", e.target.value)
                  }
                />
                {schedule?.activities?.map((activity, activityIndex) => (
                  <div
                    key={activityIndex}
                    className="mb-2 w-full flex items-center gap-1"
                  >
                    <Textarea
                      size="sm"
                      placeholder="Hoạt động"
                      id={`schedule-activity-${dateIndex}-${activityIndex}`}
                      name={`schedule-activity-${dateIndex}-${activityIndex}`}
                      className="bg-slate-200 mt-1 block rounded-md"
                      value={activity}
                      onChange={(e) =>
                        handleActivityChange(
                          dateIndex,
                          activityIndex,
                          e.target.value
                        )
                      }
                    ></Textarea>
                    {activityIndex > 0 && (
                      <Button
                        color="danger"
                        size="sm"
                        isIconOnly
                        className="remove-activity-btn"
                        onClick={() =>
                          handleRemoveActivity(dateIndex, activityIndex)
                        }
                      >
                        <DeleteIcon />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  isIconOnly
                  color="primary"
                  className="add-activity-btn"
                  onClick={() => handleAddActivity(dateIndex)}
                >
                  <PlusIcon />
                </Button>
              </Card>
              {dateIndex > 0 && (
                <Button
                  color="danger"
                  size="sm"
                  isIconOnly
                  className="remove-schedule-btn"
                  onClick={() => handleRemoveSchedule(dateIndex)}
                >
                  <DeleteIcon />
                </Button>
              )}
            </div>
          ))}
          <Button
            color="primary"
            className="add-schedule-btn"
            onClick={handleAddSchedule}
            startContent={<PlusIcon />}
          >
            Thêm hoạt động
          </Button>
        </div>

        {/* Images */}
        <div className="mb-4 w-full">
          <Card>
            <div className="file-upload">
              <h3 className="font-semibold">Tải ảnh lên</h3>
              <input 
                label="Hình ảnh"
                required
                type="file"
                multiple // Allow multiple file selection
                id="thumbnail"
                onChange={handleChange}
                name="thumbnail"/>
            </div>
            <div className="py-2 grid grid-cols-4 gap-2">
              {urls?.map((url, index) => (
                <div key={index}>
                  <div className="relative">
                    <Button
                      isIconOnly
                      size="sm"
                      radius="full"
                      onClick={() => handleRemoveUrl(index)}
                      className="bg-pink-600 absolute left-0"
                    >
                      <XMarkIcon className="text-white" />
                    </Button>
                    <img className="h-32 w-40 border" src={url} alt="preview" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>


        {/* Submit button */}
        <div>
          <Button
            type="submit"
            color="primary"
            onClick={uploadAndSave}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white"
          >
            Create Tour
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewTourForm;
