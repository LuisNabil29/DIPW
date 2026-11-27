  import { Routes, Route } from "react-router-dom";
  import Home from "../views/Home";
  import Contacto from "../views/Contacto";
  import Blog from "../views/Blog";
  import BlogPost from "../views/BlogPost";

  function AppRoutes() {
    return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/contacto" element={<Contacto />} />
         <Route path="/blog" element={<Blog />} />
         <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    );
  }

  export default AppRoutes;
