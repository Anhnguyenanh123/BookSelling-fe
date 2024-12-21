import React from "react";
import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommended from "./Recommended";
import New from "./New";

const Home = () => {
  return (
    <>
      <Banner />
      <TopSellers />
      <Recommended />
      <New />
    </>
  );
};

export default Home;
