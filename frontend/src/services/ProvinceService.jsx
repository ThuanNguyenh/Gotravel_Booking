import axios from "axios";

const province = axios.create({
  baseURL: "https://esgoo.net/api-tinhthanh/",
});
// https://esgoo.net/api-tinhthanh/4/0.htm
// Tỉnh / thành phố
export const resProvince = async () => {
  try {
    const res = await province.get("4/0.htm");
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// Quận / huyện
export const resDistrict = async (provinceId) => {
  try {
    const res = await province.get(`2/${provinceId}.htm`);
    console.log(res.data.data);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

// xã / phường
export const resWard = async (districtId) => {
  try {
    const res = await province.get(`3/${districtId}.htm`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
