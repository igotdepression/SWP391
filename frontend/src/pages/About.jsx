import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/about.css";

function About() {
  return (
    <div className="adn-about-page">
      <Header />
      <main className="adn-about-main">
        <section className="adn-about-banner">
          <img src="/img/about-full-banner.jpg" alt="Banner" className="adn-about-banner-img" />
        </section>
        <section className="adn-about-content-box">
          <h1 className="adn-about-title">Giới thiệu về ADN Chain</h1>
          <p>ADN Chain là đơn vị tiên phong trong lĩnh vực xét nghiệm di truyền tại Việt Nam...</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;
