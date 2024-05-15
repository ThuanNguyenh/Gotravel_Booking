const getDataFromLocalStorage = (key) => {
  if (typeof localStorage !== "undefined" && localStorage !== null) {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data); // trả về dữ liệu được parse từ chuỗi JSON
    }
  }
  return null;
};

export default getDataFromLocalStorage;
