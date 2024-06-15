import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Favourite from "./Pages/Favourite";
import Cart from "./Pages/Cart";
import Search from "./Pages/Search";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import BookDetail from "./Pages/Details/Bookdetails";
import CategotyBooks from "./Pages/Details/CategoryBooks";
import getData from "./Api/Data";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import RestPassword from "./Pages/Auth/RestPassword";
import ChangePassword from "./Pages/Auth/ChangePassword";
import VerifyResetCode from "./Pages/Auth/VerifyResetCode";
import NotFound from "./Pages/Auth/NotFound";
import Profile from "./Pages/Auth/Profile";

const App = () => {
  // states
  const [trendyBooks, setTrendyBooks] = useState("");
  const [recentBooks, setRecentBooks] = useState("");
  const [allBooks, setAllBooks] = useState("");

  const [author, setAuthor] = useState([]);
  const [category, setCategory] = useState([]);
  const [subject, setSubject] = useState([]);
  const [level, setLevel] = useState([]);
  const [educationStage, setEducationStage] = useState([]);

  const [currentBook, setCurrentBook] = useState("");

  // useEffect
  useEffect(() => {
    getTrendyBooks();
    getRecentBooks();
    getAllBooks();
    getEducationStage();
    getSubject();
    getLevel();
    getCategory();
    getAuthor();
  }, []);

  function getTrendyBooks() {
    getData(`Book/GetTrendyBooks`, {}, "GET").then((res) => {
      if (res?.status !== 200) {
        console.log("failed");
      } else {
        // console.log("sucess",res.data);
        setTrendyBooks(res.data);
      }
    });
  }

  function getRecentBooks() {
    getData(`Book/GetRecentPublishBooks`, {}, "GET").then((res) => {
      if (res?.status !== 200) {
        console.log("failed");
      } else {
        setRecentBooks(res.data);
      }
    });
  }

  function getAllBooks() {
    getData(`Book`, {}, "GET").then((res) => {
      if (res?.status !== 200) {
        console.log("failed");
      } else {
        setAllBooks(res.data);
      }
    });
  }

  const getEducationStage = () => {
    getData("EducationStage", {}, "GET").then((res) => {
      if (res.status !== 200) {
        console.log("fetch failed 001");
      } else {
        let newData = res.data.map((data) => ({
          value: data.educationStageId,
          label: data.stageName,
        }));
        newData.unshift({
          value: "",
          label: " كل المراحل",
        });
        setEducationStage(newData);
      }
    });
  };

  const getSubject = () => {
    getData("Subject", {}, "GET").then((res) => {
      if (res.status !== 200) {
        console.log("fetch failed 001");
      } else {
        let newData = res.data.map((data) => ({
          value: data.subjectId,
          label: data.subjectName,
        }));
        newData.unshift({
          value: "",
          label: "كل المواد",
        });
        setSubject(newData);
      }
    });
  };

  const getLevel = () => {
    getData("Level", {}, "GET").then((res) => {
      if (res.status !== 200) {
        console.log("fetch failed 001");
      } else {
        let newData = res.data.map((data) => ({
          value: data.levelId,
          label: data.levelName,
        }));
        newData.unshift({
          value: "",
          label: "كل السنين",
        });
        setLevel(newData);
      }
    });
  };

  const getCategory = () => {
    getData("Category", {}, "GET").then((res) => {
      if (res.status !== 200) {
        console.log("fetch failed 001");
      } else {
        let newData = res.data.map((data) => ({
          value: data.categoryId,
          label: data.categoryName,
        }));
        newData.unshift({
          value: "",
          label: "كتاب & ملازم ",
        });
        setCategory(newData);
      }
    });
  };

  const getAuthor = () => {
    getData("Author", {}, "GET").then((res) => {
      if (res.status !== 200) {
        console.log("fetch failed 001");
      } else {
        let newauthors = res.data.map((author) => ({
          value: author.authorId,
          label: author.authorName,
        }));
        newauthors.unshift({
          value: "",
          label: "الكتب ",
        });
        setAuthor(newauthors);
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              trendyBooks={trendyBooks}
              recentBooks={recentBooks}
              setCurrentBook={setCurrentBook}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <Categories
              setCurrentBook={setCurrentBook}
              educationStage={educationStage}
              level={level}
              subject={subject}
              category={category}
              author={author}
              allBooks={allBooks}
            />
          }
        />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/restPassword" element={<RestPassword />} />
        <Route path="/verifyResetCode" element={<VerifyResetCode />} />
        <Route path="/changePassword" element={<ChangePassword />} />

        <Route
          path="/bookdetails"
          element={<BookDetail currentBook={currentBook} />}
        />
        <Route path="/categotyBooks" element={<CategotyBooks />} />
        <Route
          path="/search"
          element={
            <Search
              setCurrentBook={setCurrentBook}
              educationStage={educationStage}
              level={level}
              subject={subject}
              category={category}
              author={author}
              allBooks={allBooks}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
