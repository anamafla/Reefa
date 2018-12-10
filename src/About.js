import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

function About() {
  return (
    <div>
      <NavBar />
      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">About me</h2>
              <p>
                I’m Ana, I am passionate about the web, its impact and its
                potential to transform the world, and this is why I made the
                decision to retrain and change careers to become a Web Developer
                back in 2017. I am looking for a projects where I can work as a
                React Frontend Web Developer to build great user friendly
                solutions. If you are looking for someone with dedication,
                professionalism, and problem-solving skills contact me.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;
