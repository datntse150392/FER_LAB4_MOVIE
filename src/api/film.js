import axios from "axios";
import { useNavigate } from "react-router-dom";

export const deleteFilmbyid = (id) => {
  if (window.confirm("Bạn chắc chắn muốn xóa Phim này không?")) {
    fetch("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films/" + id, {
      method: "DELETE",
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
};

// Want to use async/await? Add the `async` keyword to your outer function/method.
export async function getListFilms() {
  try {
    const response = await axios.get("/user?ID=12345");
    return response;
  } catch (error) {
    console.error(error);
  }
}
