import { useEffect, useState } from "react";
import CourseCard from "./CardCourse";
import Store from "../store/courses-store";
import { observer } from "mobx-react-lite";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Empty, Flex, Spin, Modal, Input, Select, message } from "antd";
import CardCombo from "./CardCombo";

const ComboPage = observer(() => {
  const { getAllGroups, getAllCourses, groups, loading, createGroup, courses } =
    Store;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comboName, setComboName] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    getAllGroups();
  }, []);

  const showModal = () => {
    if (!courses.length) {
      getAllCourses();
    }
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!comboName.trim()) {
      message.error("Введите название комбинации");
      return;
    }

    if (selectedCourses.length === 0) {
      message.error("Выберите хотя бы один курс");
      return;
    }

    if (selectedCourses.length > 3) {
      message.error("Можно выбрать не более 3 курсов");
      return;
    }

    setCreateLoading(true);
    try {
      await createGroup({
        name: comboName,
        courses: selectedCourses,
      });
      message.success("Комбинация успешно создана");
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      message.error("Ошибка при создании комбинации");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setComboName("");
    setSelectedCourses([]);
  };

  const handleCourseChange = (value) => {
    if (value.length > 3) {
      message.warning("Можно выбрать не более 3 курсов");
      return;
    }
    setSelectedCourses(value);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ height: "50vh" }}>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </Flex>
    );
  }

  if (groups.length === 0) {
    return (
      <>
        <Flex
          justify="center"
          align="center"
          vertical
          style={{ height: "50vh" }}
        >
          <Empty description="Комбинации не найдены" />
        </Flex>
        <center>
          <Button onClick={showModal}>
            Создать
          </Button>
        </center>
        <Modal
          title="Создать новую комбинацию"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          confirmLoading={createLoading}
          okText="Создать"
          cancelText="Отмена"
        >
          <div style={{ marginBottom: 16 }}>
            <Input
              placeholder="Название комбинации"
              value={comboName}
              onChange={(e) => setComboName(e.target.value)}
              maxLength={50}
            />
          </div>

          <Select
            mode="multiple"
            placeholder="Выберите курсы (не более 3)"
            style={{ width: "100%" }}
            value={selectedCourses}
            onChange={handleCourseChange}
            options={courses.map((course) => ({
              label: course.title,
              value: course.title,
            }))}
            maxTagCount={3}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
          <p style={{ marginTop: 8, color: "#999", fontSize: 12 }}>
            Выбрано: {selectedCourses.length} из 3
          </p>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Flex
        align="center"
        justify="space-around"
        wrap
        gap="middle"
        style={{ position: "relative", top: 20, marginBottom: 50 }}
      >
        {groups.map((group) => (
          <CardCombo key={group.id} group={group} />
        ))}
      </Flex>
      <center>
        <Button onClick={showModal}>
          Создать
        </Button>
      </center>
      <Modal
        title="Создать новую комбинацию"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={createLoading}
        okText="Создать"
        cancelText="Отмена"
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Название комбинации"
            value={comboName}
            onChange={(e) => setComboName(e.target.value)}
            maxLength={50}
          />
        </div>

        <Select
          mode="multiple"
          placeholder="Выберите курсы (не более 3)"
          style={{ width: "100%" }}
          value={selectedCourses}
          onChange={handleCourseChange}
          options={courses.map((course) => ({
            label: course.title,
            value: course.title,
          }))}
          maxTagCount={3}
          showSearch
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
        />
        <p style={{ marginTop: 8, color: "#999", fontSize: 12 }}>
          Выбрано: {selectedCourses.length} из 3
        </p>
      </Modal>
    </>
  );
});

export default ComboPage;
