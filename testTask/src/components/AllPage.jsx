import { useEffect } from "react";
import CourseCard from "./CardCourse";
import Store from "../store/courses-store";
import { observer } from "mobx-react-lite";
import { Empty, Flex } from "antd";

const AllPage = observer(() => {
  const { getAllCourses, courses, getAllLiked } = Store;

  useEffect(() => {
    getAllLiked();
    getAllCourses();
  }, []);

  if (courses.length === 0) {
    return (
      <Flex justify="center" align="center" style={{ height: "50vh" }}>
        <Empty description="Курсы не найдены" />
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      justify="space-around"
      wrap
      gap="middle"
      style={{ position: "relative", top: 20, marginBottom: 50 }}
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </Flex>
  );
});

export default AllPage;
