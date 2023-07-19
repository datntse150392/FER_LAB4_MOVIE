import { Routes, Route } from "react-router-dom";
import { DefaultLayout, FilmLayout, AdminLayout } from "./components/Layout";
import { publicRoutes } from "./routes";
import { Fragment } from "react";
// useNavigate
import { useNavigate } from "react-router-dom";

// Conponents
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Content from "./pages/Content";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import CreateFilm from "./pages/CreateFilm";
import UpdateFilm from "./pages/UpdateFilm";
import MyList from "./pages/MyList";
import TVShow from "./pages/TVShow";
import DetailFilm from "./pages/DetailFilm";
import TrailerFilm from "./pages/TrailerFilm";
import ActionFilm from "./pages/ActionFilm";
import SeriesFilm from "./pages/SeriesFilm";
import UserProfile from "./pages/UserProfile";
import WatchFilm from "./pages/WatchFilm";
import FreeTrial from "./pages/7DayFreeTrial";
import ManageAccount from "./pages/Admin/ManageAccount";
import Payment from "./pages/Payment";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/admin"
          element={
            localStorage.getItem("email") == "datntse150392@fpt.edu.vn" ? (
              <AdminLayout>
                <Admin />
              </AdminLayout>
            ) : (
              <FilmLayout>
                <Login />
              </FilmLayout>
            )
          }
        />
        <Route
          path="/admin/createFilm"
          element={
            localStorage.getItem("accessToken") ? (
              <AdminLayout>
                <CreateFilm />
              </AdminLayout>
            ) : (
              <Fragment>
                <Login />
              </Fragment>
            )
          }
        />
        <Route
          path="/admin/updateFilm/:id"
          element={
            localStorage.getItem("email") == "datntse150392@fpt.edu.vn" ? (
              <AdminLayout>
                <UpdateFilm />
              </AdminLayout>
            ) : (
              <Fragment>
                <Login />
              </Fragment>
            )
          }
        />
        {/* Manage Account */}
        <Route
          path="/admin/manageAccount"
          element={
            localStorage.getItem("email") == "datntse150392@fpt.edu.vn" ? (
              <AdminLayout>
                <ManageAccount />
              </AdminLayout>
            ) : (
              <Fragment>
                <Login />
              </Fragment>
            )
          }
        />
        <Route
          path="/login"
          element={
            // localStorage.getItem("accessToken") ? (
            //   <AdminLayout>
            //     <Admin />
            //   </AdminLayout>
            // ) : (
            <Fragment>
              <Login />
            </Fragment>
            // )
          }
        />
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Content />
            </DefaultLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <Fragment>
              <Contact />
            </Fragment>
          }
        />
        <Route
          path="/film/homePage"
          element={
            <FilmLayout>
              <HomePage />
            </FilmLayout>
          }
        />
        <Route
          path="/film/homePage/:id"
          element={
            <FilmLayout>
              <HomePage />
            </FilmLayout>
          }
        />
        <Route
          path="/film/myList"
          element={
            localStorage.getItem("accessToken") ? (
              <FilmLayout>
                <MyList />
              </FilmLayout>
            ) : (
              <Fragment>
                <Login />
              </Fragment>
            )
          }
        />
        <Route
          path="/film/myList/:id"
          element={
            localStorage.getItem("accessToken") ? (
              <FilmLayout>
                <MyList />
              </FilmLayout>
            ) : (
              <Fragment>
                <Login />
              </Fragment>
            )
          }
        />
        {/* ROUTE PHIM TRUYỀN HÌNH */}
        <Route
          path="/film/series"
          element={
            <FilmLayout>
              <SeriesFilm />
            </FilmLayout>
          }
        />
        <Route
          path="/film/series/:id"
          element={
            <FilmLayout>
              <SeriesFilm />
            </FilmLayout>
          }
        />
        {/* ROUTE PHIM TRUYỀN HÌNH */}
        {/* ROUTE PHIM HÀNH ĐỘNG */}
        <Route
          path="/film/action"
          element={
            <FilmLayout>
              <ActionFilm />
            </FilmLayout>
          }
        />
        <Route
          path="/film/action/:id"
          element={
            <FilmLayout>
              <ActionFilm />
            </FilmLayout>
          }
        />
        {/* ROUTE PHIM Dành Cho Trẻ EM */}
        {/* ROUTE TVSHOW */}
        <Route
          path="/film/tvShow"
          element={
            <FilmLayout>
              <TVShow />
            </FilmLayout>
          }
        />
        <Route
          path="/film/tvShow/:id"
          element={
            <FilmLayout>
              <TVShow />
            </FilmLayout>
          }
        />
        {/* ROUTE TVSHOW */}
        {/* Detail Film */}
        <Route
          path="/film/detailFilm/:id"
          element={
            <FilmLayout>
              <DetailFilm />
            </FilmLayout>
          }
        />
        {/* Detail Film */}
        {/* Trailer Film */}
        <Route
          path="/film/trailerFilm/:id"
          element={
            <FilmLayout>
              <TrailerFilm />
            </FilmLayout>
          }
        />
        {/* Trailer Film */}
        {/* Watching Film */}
        <Route
          path="/film/WatchFilm/:id"
          element={
            <Fragment>
              <WatchFilm />
            </Fragment>
          }
        />
        {/* Watching Film */}
        {/* 7 Day Free Trial */}
        <Route
          path="/7dayfreetrial"
          element={
            <Fragment>
              <FreeTrial />
            </Fragment>
          }
        />
        {/* 7 Day Free Trial */}
        {/* {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          console.log(route.layout);
          if (route.layout) {
            // Layout = DefaultLayout;
            if (route.layout == "defaultLayout") {
              Layout = DefaultLayout;
            } else if (route.layout == "filmLayout") {
              Layout = FilmLayout;
            } else if (route.layout == "adminLayout") {
              Layout = AdminLayout;
            }
          } else {
            Layout = Fragment;
          }
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })} */}

        {/* DEV KHAI */}
        {/* Account Profile */}
        <Route
          path="/account/userprofile"
          element={
            <FilmLayout>
              <UserProfile />
            </FilmLayout>
          }
        />
        <Route
          path="/pay"
          element={
            localStorage.getItem("accessToken") ? (
              <FilmLayout>
                <Payment />
              </FilmLayout>
            ) : (
              <Fragment>
                <Login />
              </Fragment>
            )
          }
        >
          <Route
            path=":id"
            element={
              <FilmLayout>
                <Payment />
              </FilmLayout>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
