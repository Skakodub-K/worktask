import Card from "antd/es/card/Card";
import { Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Store from "../store/courses-store";
import { observer } from "mobx-react-lite";

const CardCombo = observer((props) => {
  const { id, name, courses } = props.group;
  const { removeGroup } = Store;
  return (
    <Card style={{ width: 350 }}>
      <p>
        <b>{name}</b>
      </p>
      {courses.map((course) => (
        <p>{course}</p>
      ))}
      <center>
        <Button
          onClick={() => {
            removeGroup(id);
          }}
        >
          <DeleteOutlined />
        </Button>
      </center>
    </Card>
  );
});

export default CardCombo;
