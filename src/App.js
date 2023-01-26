import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Gallery, User } from "./Features";
import { Layout } from "./Layouts";
import { paths } from "./Configs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home.path} element={<Layout />}>
          <Route index element={<Gallery />} />

          <Route path={paths.user.path} element={<User />} />

          <Route path="*" element={<h2>No such path</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
