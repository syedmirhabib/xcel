import Banner from "./Banner";
import About from "./About";
import CountSection from "./CountSection";
import PopularClass from "./PopularClass";
import { Helmet } from "react-helmet-async";
import PopularInstructor from "./PopularInstructor";
import WelcomePage from "../../components/WelcomePage/WelcomePage";
import Contact from "./Contact";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> DesignXcel | Home</title>
      </Helmet>

      <Banner />
      <PopularInstructor />
      <About />
      <PopularClass />
      <CountSection />
      <WelcomePage />
      <Contact />
    </div>
  );
};

export default Home;
