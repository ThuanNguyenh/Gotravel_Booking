
const Footer = () => {
  return (
    <div className="justify-center flex mt-10 py-10 border-t rounded-t-[20px] bg-gradient-to-b from-[#fff] to-[#E3F7FC]">
      <div className="w-5/6 items-start grid md:grid-cols-5 grid-cols-1 gap-4">
        <div className="flex ">
          <img src="/Logo.png" className="me-2 w-8" />
          <p className={`font-[600] text-2xl text-cyan-500`}>TourTrek</p>
        </div>

        <div className="text-slate-500 text-[14px] flex flex-col gap-4 font-medium ">
          <p className="text-[#333333] font-bold">TourTrek</p>
          <p>Về chúng tôi</p>
          <p>Liên hệ</p>
        </div>
        <div className="text-slate-500 text-[14px] flex flex-col gap-4 font-medium ">
          <p className="text-[#333333] font-bold">Thông tin pháp lý</p>
          <p>Chính sách bảo mật</p>
          <p>Điều khoản dịch vụ</p>
        </div>
        <div className="text-slate-500 text-[14px] flex flex-col gap-4 font-medium ">
          <p className="text-[#333333] font-bold">Liên kết nhanh</p>
          <p>Tìm kiếm</p>
          <p>Gần đây</p>
        </div>
        <div className="text-slate-500 text-[14px] flex flex-col gap-4 font-medium ">
          <p>© 2024 TourTrek.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
