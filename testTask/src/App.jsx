import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Menu } from "antd";
import {
  UnorderedListOutlined,
  UngroupOutlined,
} from "@ant-design/icons";
import { Navigate, Routes, Route, useNavigate } from "react-router";
import AllPage from "./components/AllPage.jsx";
import ComboPage from "./components/ComboPage.jsx";

const items = [
  {
    label: "Все курсы",
    key: "all",
    icon: <UnorderedListOutlined />,
  },
  {
    label: "Комбо",
    key: "combo",
    icon: <UngroupOutlined />,
  },
];

const App = observer(() => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <>
      <center>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </center>
      <Routes>
        <Route path="/" element={<AllPage />} />
        <Route path="/all" element={<Navigate to="/" replace />} />
        <Route path="/combo" element={<ComboPage />} />
      </Routes>
    </>
  );
});

export default App;
