import Swal from "sweetalert2";

// success
export const Alert = (timer, title, message, icon) => {
  Swal.fire({
    timer: timer, //1500
    title: title, //'Đăng nhập'
    text: message, //'Thành công'
    icon: icon, //'success' or 'error' or 'warning'
    showConfirmButton: false,
  });
};

// loading
export const LoadingAlert = (timer, title) => {
  let timerInterval;
  Swal.fire({
    timer: timer, //1500
    title: title, //'Đăng nhập'
    html: 'Loading <b></b>', // Added element to display timer
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector('b');
      timerInterval = setInterval(() => {
        if (b) {
          b.textContent = Swal.getTimerLeft();
        }
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  });
};

// delete
export const DeleteAlert = (onDelete) => {
  Swal.fire({
    title: "Bạn chắc chắn muốn xóa?",
    text: "Bạn sẽ không nhìn thấy sản phẩm này nữa!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(); // gọi hàm xóa
      Swal.fire({
        title: "Đã xóa!",
        icon: "success",
      });
    }
  });
};
