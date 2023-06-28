import Admin from "../pages/Admin";
import Contact from "../pages/Contact";
import Content from "../pages/Content";
import CreateFilm from "../pages/CreateFilm";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import MyList from "../pages/MyList";
import UpdateFilm from "../pages/UpdateFilm";
// Public routes
const publicRoutes = [
  {
    path: "/",
    component: Content,
    layout: "defaultLayout",
  },
  {
    path: "/login",
    component: Login,
    layout: null,
  },
  {
    path: "/film/homePage/",
    component: HomePage,
    layout: "filmLayout",
  },
  {
    path: "/film/homePage/:id",
    component: HomePage,
    layout: "filmLayout",
  },
  {
    path: "/film/myList/",
    component: MyList,
    layout: "filmLayout",
  },
  {
    path: "/film/myList/:id",
    component: MyList,
    layout: "filmLayout",
  },
  {
    path: "/contact",
    component: Contact,
    layout: null,
  },

  {
    // CRUD
    path: "/admin",
    component: Admin,
    layout: "adminLayout",
  },
  {
    // CRUD
    path: "/admin/createFilm",
    component: CreateFilm,
    layout: "adminLayout",
  },
  {
    // CRUD
    path: "/admin/updateFilm/:id",
    component: UpdateFilm,
    layout: "adminLayout",
  },
];
// Phải đăng nhập mới vào được, còn không sẽ lái vào trang login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
