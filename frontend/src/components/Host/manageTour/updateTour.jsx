/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
import { Alert, LoadingAlert } from "../../Alert/Alert";
import "../../../index.css";

function UpdateTourForm({ tourId, handleSave }) {
  // get userId from localStorage
  const userString = localStorage.getItem("userInfo");
  const user = JSON.parse(userString);
  const userId = user?.userId;

  // get accessToken from localStorage
  const token = localStorage.getItem("accessToken");

  // const [dataTour, setDataTour] = useState([]);
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
  const [imageList, setImageList] = useState([]);
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
      setImageList((prevState) => [...prevState, newImage]);

      const currentUrl = URL.createObjectURL(newImage);
      setUrls((prev) => [...prev, currentUrl]);
    }
  };

  // Images upload
  const uploadMultipleFiles = async (imageList) => {
    const storageRef = ref(storage); // Thay 'storage' bằng đường dẫn đến thư mục bạn muốn lưu trữ ảnh

    try {
      const uploadPromises = imageList.map(async (file) => {
        const imageRef = ref(storageRef, `images/${file.name}`);
        await uploadBytes(imageRef, file);
        const downloadUrl = await getDownloadURL(imageRef);
        return downloadUrl;
      });

      const downloadUrls = await Promise.all(uploadPromises);
      setImageList((url) => [...url, downloadUrls]);
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
  const [dataTour, setDataTour] = useState({
    tourName: "",
    description: "",
    thumbnail: "",
    province: "",
    district: "",
    ward: "",
    detailAddress: "",
    priceAdult: "",
    priceChildren: "",
    tourTime: "",
    numGuest: "",
    discount: "",
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

  const {
    tourName,
    description,
    // thumbnail,
    // province,
    // district,
    // ward,
    detailAddress,
    priceAdult,
    priceChildren,
    numGuest,
    discount,
    tourTime,
    // owner,
    images,
    categories,
    utilities,
    rules,
    // schedules
  } = dataTour;

  // get images form data
  useEffect(() => {
    const newUrls2 = images.map((image) => image.url);
    setUrls([...newUrls2]);
  }, [images]);

  useEffect(() => {
    setSelectCate(...categories.map((item) => item.categoryId));
  }, [categories]);

  useEffect(() => {
    setSelectRule(...rules.map((item) => item.ruleId));
  }, [rules]);

  useEffect(() => {
    setSelectAmen(...utilities.map((item) => item.utilityId));
  }, [utilities]);

  // input change
  const change = (e) => {
    const { name, value } = e.target;
    setDataTour((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //get detail tour
  const getTourDetail = async () => {
    try {
      if (!token) {
        return;
      }

      // Thêm token vào tiêu đề "Authorization"
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/api/v1/tour/${tourId}`,
        config
      );
      setDataTour(response.data);
    } catch (error) {
      let messageError = "Lỗi";

      if (error?.response) {
        messageError = error.response.data?.message;

        Alert(2000, "Chỉnh sửa tour", messageError, "error");
      }
    }
  };

  console.log("data: ", dataTour);

  useEffect(() => {
    getTourDetail();
  }, []);

  // save tour
  const saveTour = async (urls) => {
    const dataRequest = {
      ...dataTour,
      thumbnail: urls[0],
      images: [...urls.map((url) => ({ url }))],
    };

    try {
      if (!token) {
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.put(
        `http://localhost:8080/api/v1/tour/update/${tourId}`,
        dataRequest,
        config,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("ket qua da luu: ", response);
    } catch (error) {
      console.log("loi roi: ", error);
    }
    handleSave("ManageTour");
  };

  // UploadAndSave
  const uploadAndSave = async (e) => {
    e.preventDefault();
    try {
      LoadingAlert(3000, "Đang cập nhật");
      await uploadMultipleFiles(imageList);
      await saveTour(urls);
      Alert(2000, "Update tour", "Thành công", "success", "OK");
    } catch (error) {
      Alert(2000, "Update tour", "Thất bại", "error", "OK");
    }
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        Chỉnh sửa Tour
      </h1>
      <form>
        {/* Tour Name */}
        <div className="mb-4">
          <Input
            label="Tên tour"
            onChange={change}
            required
            value={tourName}
            type="text"
            id="tourName"
            name="tourName" // Update name attribute to match the field name
            className=" mt-1 block w-full "
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <Textarea
            label="Mô tả"
            id="description"
            required
            value={description}
            onChange={change}
            name="description" // Update name attribute to match the field name
            className=" mt-1 block w-full "
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
          <div className="w-[25%]">
            <Input
              label="Địa chỉ chi tiết"
              onChange={change}
              value={detailAddress}
              required
              type="text"
              id="detailAddress"
              name="detailAddress" // Update name attribute to match the field name
              className=" block w-full "
            />
          </div>
        </div>

        {/* Amenities*/}
        <div className="mb-4 flex gap-5">
          <Category Cates={handleCateChange} value={selectCate} />
          <Amenities Utils={handleAmenChange} value={selectAmen} />
          <Rules Rules={handleRuleChange} value={selectRule} />
        </div>

        <div className="grid grid-cols-5 gap-4">
          {/* Number of Guests */}
          <div className="mb-4">
            <Input
              min={0}
              label="Số lượng khách / người"
              value={dataTour?.numGuest}
              onChange={change}
              required
              type="number"
              id="numGuest"
              name="numGuest" // Update name attribute to match the field name
              className=" mt-1 block w-full "
            />
          </div>

          {/* Discount */}
          <div className="mb-4">
            <Input
              label="Giảm giá %"
              onChange={change}
              value={dataTour?.discount}
              type="number"
              id="discount"
              max={100}
              min={0}
              name="discount" // Update name attribute to match the field name
              className=" mt-1 block w-full "
            />
          </div>
          {/* price adult */}

          <div className="mb-4">
            <Input
              min={0}
              label="Giá vé người lớn / $"
              onChange={change}
              value={dataTour?.priceAdult}
              required
              type="number"
              id="priceAdult"
              name="priceAdult" // Update name attribute to match the field name
              className=" mt-1 block w-full "
            />
          </div>

          {/* Price children*/}
          <div className="mb-4">
            <Input
              min={0}
              label="Giá vé trẻ em / $"
              onChange={change}
              value={dataTour?.priceChildren}
              required
              type="number"
              id="priceChildren"
              name="priceChildren" // Update name attribute to match the field name
              className=" mt-1 block w-full "
            />
          </div>

          {/* tour time */}
          <div className="mb-4">
            <Input
              min={0}
              label="Thơi gian tour / ngày"
              onChange={change}
              value={dataTour?.tourTime}
              required
              type="number"
              id="tourTime"
              name="tourTime" // Update name attribute to match the field name
              className=" mt-1 block w-full "
            />
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-4 grid grid-cols-2 gap-3 justify-center">
          {schedules?.map((schedule, dateIndex) => (
            <div key={dateIndex} className="mb-4 flex items-start gap-3">
              <Card className="p-2 w-full items-center">
                <div className="text-center font-semibold">
                  Hoạt động {dateIndex + 1}
                </div>
                <Input
                  type="number"
                  size="sm"
                  placeholder="Ngày"
                  id={`schedule-date-${dateIndex}`}
                  name={`schedule-date-${dateIndex}`}
                  className=" mt-1 block rounded-md"
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
                      className=" mt-1 block rounded-md"
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
              <div className="w-10">
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
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center pb-5">
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
                name="thumbnail"
              />
              <div className="py-2 grid grid-cols-3 gap-2">
                {urls?.map((url, index) => (
                  <div key={index}>
                    <div className="relative">
                      <Button
                        isIconOnly
                        size="sm"
                        onClick={() => handleRemoveUrl(index)}
                        className="bg-pink-600 absolute right-0"
                      >
                        <XMarkIcon className="text-white" />
                      </Button>
                      <img
                        className="h-52 w-80 border"
                        src={url}
                        alt="preview"
                      />
                    </div>
                  </div>
                ))}
              </div>
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
            Lưu Thay Đổi
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTourForm;
