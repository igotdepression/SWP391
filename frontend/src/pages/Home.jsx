import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/home.css";

function Home() {
  return (
    <div className="adn-home">
      <Header />
      <main className="adn-main">
        <div className="adn-banner-content adn-banner-center">
          <h1>ADN CHAIN</h1>
          <div className="adn-banner-sub">Chính xác - Nhanh chóng - Bảo mật</div>
          <div className="adn-banner-quote">
            "Chuyên nghiệp trong từng kết quả, tận tâm trong từng bước"
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;