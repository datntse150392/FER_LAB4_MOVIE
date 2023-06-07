import { Routes, Route } from "react-router-dom";
import { DefaultLayout, FilmLayout } from "./components/Layout";
import { publicRoutes } from "./routes";
import { Fragment } from "react";
function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;
          console.log(route.layout);
          if (route.layout) {
            // Layout = DefaultLayout;
            if (route.layout == "defaultLayout") {
              Layout = DefaultLayout;
            } else if (route.layout == "filmLayout") {
              Layout = FilmLayout;
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
        })}
      </Routes>
    </div>
  );
}

export default App;
