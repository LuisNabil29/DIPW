import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />

        <main className="flex-grow pt-5 ">
          <AppRoutes />
        </main>

      <Footer />
    </div>
  );
}

export default App;
