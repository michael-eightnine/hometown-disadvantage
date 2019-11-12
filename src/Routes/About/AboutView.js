import React from "react";
import map from "Svg/hta-map.svg";
import "./aboutView.scss";

const AboutView = () => (
  <section className="view view__about">
    <div className="about__image">
      <img src={map} alt="the saddest landscape" />
    </div>
    <div className="about__content">
      <p>
        Hometown [dis]Advantage is a visual artist living and creating in
        Chicago. These creations focus on distilling imagery to a bold, base
        form and draw influence from sources like ritualistic iconography,
        traditional tattoo flash, camp aesthetic, and the city he calls home.
      </p>
      <p className="about__highlight">
        [Rode a tractor from Wyoming to Chicago Illinois....]
      </p>
      <p>
        For real though, Hometown [dis]Advantage is an ongoing (and forever)
        stream of content, nothing more nothing less. The face continually
        changes but the bone structure’s never moved an inch.
      </p>
      <p>
        Surrounded by technology and strangers ya heard, that's why I got a
        website.
      </p>
    </div>
  </section>
);

export default AboutView;
