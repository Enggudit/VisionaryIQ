import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/home page/home";
import Navbar from "./components/navbar/navbar";
import Mobilenav from "./components/navbar/mobinabar";
import Marquee from "./components/home page/marquee";
import About from "./components/home page/about";
import Footer from "./components/home page/footer";
import Card from "./components/home page/cards";
import Coding from "./components/sections/coding";
import Aboutsec from "./components/sections/aboutsec";
import Verbal from "./components/sections/verbal";
import Startest from "./components/test-section/startest";
import Start from "./components/test-section/test";
import Blog from "./components/blog";
import Submit from "./components/submit";
import Gamezone from "./components/home page/gamezone";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  const [canAccessTest, setCanAccessTest] = useState(false);

  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <>
          <Navbar />
          <Mobilenav />
          <Home />
          <Marquee />
          <Card />
          <About />
          <Gamezone />
          <Footer />
        </>
      ),
    },
    {
      path: "/Verbal",
      element: (
        <>
          <Navbar />
          <Mobilenav />
          <Verbal />
        </>
      ),
    },
    {
      path: "/Aptitude/topic/question",
      element: (
        <> <Navbar /> <Mobilenav /> <Aboutsec setCanAccessTest={setCanAccessTest} />
        </>
      ),
    },
    {
      path: "/Coding",
      element: (
        <>
          <Navbar />
          <Mobilenav />
          <Coding />
        </>
      ),
    },
    {
      path: "/Aptitude/topic/question/teststart",
      element: <ProtectedRoute isAllowed={canAccessTest} redirectTo="/Aptitude/topic/question" />, // Protected route
      children: [
        {
          path: "",
          element: <Startest />,
        },
      ],
    },
    {
      path: "/Start",
      element: <ProtectedRoute isAllowed={canAccessTest} redirectTo="/Aptitude/topic/question" />, // Protected route
      children: [
        {
          path: "",
          element: <Start />,
        },
      ],
    },
    {
      path: "/AboutUs",
      element: (
        <>
          <Navbar />
          <Mobilenav />
          <Blog />
        </>
      ),
    },
    {
      path: "/testSubmit",
      element: (
        <>
          <Navbar />
          <Mobilenav />
          <Submit />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
