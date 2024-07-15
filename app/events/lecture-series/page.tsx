import { Container } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LectureHero from "../../../components/LectureSeries/Hero";
// import FollowWAChannel from "../../../components/Subscribe";
import Videos from "../../../components/LectureSeries/Videos";
import CreatedBy from "../../../components/LectureSeries/AssociatedTeams";

const LectureSeries = () => {
  return (
    <Container maxW={"7xl"} px={0}>
      <Navbar />
      <LectureHero />
      {/* <FollowWAChannel /> */}
      <CreatedBy />
      <Videos />
      <Footer />
    </Container>
  );
};

export default LectureSeries;
