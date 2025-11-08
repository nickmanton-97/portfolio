import { useEffect, useRef } from "react";
import './App.css'
import Navigation from './components/navigation/Navigation'
import Header from './components/header/Header'
import Work from './components/work/Work';
import About from './components/about/About'
import Footer from './components/footer/Footer';
import PixelCursor from './components/pixel_cursor/PixelCursor';
import Loader from './components/loader/Loader';
import Lenis from "@studio-freight/lenis";

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 0.4,              // faster catch-up
      easing: (t) => t * (2 - t), // ease-out
      smooth: true,
      direction: "vertical",
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, []);

  return (
    <>
      {/* <Loader /> */}
      <Navigation />
      <PixelCursor />
      {/* <Header /> */}
      <Work />
      <About />
      <Footer />
    </>
  )
}

export default App
