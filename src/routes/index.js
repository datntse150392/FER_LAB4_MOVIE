import Contact from "../pages/Contact";
import Content from "../pages/Content";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
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
    path: "/contact",
    component: Contact,
    layout: null,
  },
];
// Phải đăng nhập mới vào được, còn không sẽ lái vào trang login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
