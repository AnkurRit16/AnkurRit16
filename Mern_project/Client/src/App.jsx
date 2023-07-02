import { Routes, Route } from "react-router-dom";
import { Userlogin } from "./components/Userlogin";
import { Admin } from "./components/Admin";
;
import "./index.css";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path={"/Userlogin"} element={<Userlogin />} />
          <Route path={"/Admin"} element={<Admin />} />
        </Routes>
      </UserContextProvider>
    </>
  );
};

export default App;
