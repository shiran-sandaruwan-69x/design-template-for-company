import Layout from "./layout/Layout";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import LogoCarousel from "./sections/LogoCarousel";
import About from "./sections/About";
import Contact from "./sections/Contact";

function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <LogoCarousel />
      <About />
      <Contact />
    </Layout>
  );
}

export default Home;
