import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { GithubProvider } from "./context/github/GithubContext";

function App() {
  return (
    <GithubProvider>
      <BrowserRouter>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <div className="container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </GithubProvider>
  );
}

export default App;
