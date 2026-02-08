import Card from "antd/es/card/Card";
import { Tag, Button } from "antd";
import { useState } from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import Store from "../store/courses-store";

const CourseCard = observer((props) => {
  const { id, code, title } = props.course;
  const { like, unlike, isLike } = Store;
  const [isAdded, setIsAdded] = useState(isLike(id));

  return (
    <Card style={{ width: 350 }}>
      <Tag variant="filled" color="blue">
        <b>{code}</b>
      </Tag>
      <p>
        <b>{title}</b>
      </p>
      <center style={{ marginTop: 10 }}>
        <Button
          onClick={() => {
            if (!isAdded) {
              like(props.course);
            } else {
              unlike(id);
            }
            setIsAdded(!isAdded);
          }}
        >
          {isAdded ? <MinusOutlined /> : <PlusOutlined />}
        </Button>
      </center>
    </Card>
  );
});

export default CourseCard;
