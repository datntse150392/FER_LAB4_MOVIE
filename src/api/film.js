import axios from "axios";
import { useNavigate } from "react-router-dom";

export const deleteFilmbyid = (id) => {
  if (window.confirm("Bạn chắc chắn muốn xóa Phim này không?")) {
    fetch("https://64acf61eb470006a5ec514b7.mockapi.io/movie/movie/" + id, {
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

// Lấy phim theo filmID
export async function getFilmByID(id) {
  try {
    const response = await axios.get(
      "https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films/" + id
    );
    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

// Lấy danh sách tất cả phim với điều kiện phim Active
export const getFilms = () => {
  const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  url.searchParams.append("isActive", true);
  fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((tasks) => {
      let setData = () => {
        return tasks;
      };
      return setData;
    })
    .catch((error) => {
      // handle error
    });
};
