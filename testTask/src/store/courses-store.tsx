import axios from "axios";
import { makeAutoObservable } from "mobx";

class CoursesStore {
  courses = [];
  groups = [];
  liked = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }
  getAllCourses = async () => {
    try {
      this.loading = true;
      const response = await axios.get("http://localhost:3000/learnPrograms");
      this.courses = response.data || [];
    } catch (error) {
      console.error("Ошибка при загрузке курсов:", error);
      this.courses = [];
    } finally {
      this.loading = false;
    }
  };
  createGroup = async (newGroup) => {
    try {
      this.loading = true;
      this.groups.push(newGroup);
      await axios.post("http://localhost:3000/group", newGroup);
    } catch (error) {
      console.error("Ошибка при создании комбинации:", error);
    } finally {
      this.loading = false;
    }
  };
  removeGroup = async (id) => {
    try {
      this.loading = true;
      this.groups = this.groups.filter((it) => it.id !== id);
      await axios.delete(`http://localhost:3000/group/${id}`);
    } catch (error) {
      console.error("Ошибка при удалении комбинации:", error);
    } finally {
      this.loading = false;
    }
  };
  getAllGroups = async () => {
    try {
      this.loading = true;
      const response = await axios.get("http://localhost:3000/group");
      this.groups = response.data || [];
    } catch (error) {
      console.error("Ошибка при загрузке курсов:", error);
      this.groups = [];
    } finally {
      this.loading = false;
    }
  };
  like = async (course) => {
    try {
      this.loading = true;
      if (!this.isLike(course.id)) {
        this.liked.push(course);
        await axios.post("http://localhost:3000/liked", course);
      }
    } catch (error) {
      console.error("Ошибка при выборе курса:", error);
    } finally {
      this.loading = false;
    }
  };
  unlike = async (id) => {
    try {
      this.loading = true;
      this.liked = this.liked.filter((it) => it.id !== id);
      await axios.delete(`http://localhost:3000/liked/${id}`);
    } catch (error) {
      console.error("Ошибка при удалении курса:", error);
    } finally {
      this.loading = false;
    }
  };
  getAllLiked = async () => {
    try {
      this.loading = true;
      const response = await axios.get("http://localhost:3000/liked");
      this.liked = response.data || [];
    } catch (error) {
      console.error("Ошибка при загрузке курсов:", error);
      this.liked = [];
    } finally {
      this.loading = false;
    }
  };
  isLike = (id) => {
    return this.liked.some((item) => item.id === id);
  };
}

const Store = new CoursesStore();
export default Store;
