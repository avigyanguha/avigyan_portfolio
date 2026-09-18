import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Volunteering from "./sections/Volunteering";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Volunteering />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
