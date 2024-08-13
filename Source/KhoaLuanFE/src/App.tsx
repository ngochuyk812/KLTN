import { Routes, Route } from "react-router-dom";
import { privateRoute, publicRoute } from "./routes";
function App() {
  return (
    <>
      <div className="backgroundOverLay ">
        <div className="isLoading"></div>
      </div>
      <Routes>
        {publicRoute.map((item, index) => {
          const Page = item.element;
          const path = item.path;
          return <Route key={index} path={path} element={<Page />} />;
        })}
        {privateRoute.map((item, index) => {
          const Page = item.element;
          const path = item.path;
          return <Route key={index} path={path} element={<Page />} />;
        })}
      </Routes>
    </>
  );
}

export default App;
