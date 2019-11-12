import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IMAGE_CONTENT_PATH, streamData } from "Data";
import logo from "Svg/logo-horizontal.svg";
import "./splash.scss";

/**
 * Renders the Splash view top-level route component
 * Displays the HTA logo, and the first image from the `streamData` array
 * After 1 second, begins CSS transitions to prepare for a redirect to `/content-stream`
 *
 * @returns {ReactComponent} - Splash top-level route component
 */
class Splash extends Component {
  state = { prepareRedirect: false };

  /**
   * On mount, wait 1 second and then set `prepareRedirect` to `true`
   * This changes the `imageClass` className and initiates our CSS based animations
   *
   * After 3 seconds (1 second delay + 2 second animation), redirect to the first
   * grid detail view, which contains the same image as this splash screen.
   */
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        prepareRedirect: true
      });
    }, 1000);
    setTimeout(() => {
      this.props.history.push("/content-stream/0/0");
    }, 3000);
  }

  render() {
    const { prepareRedirect } = this.state;
    const featureImage = `${IMAGE_CONTENT_PATH}${streamData[0].content[0].image}.svg`;
    const imageClass = prepareRedirect ? "splash__animate" : "";

    return (
      <section className="view view__splash">
        <div className={`splash__image ${imageClass}`}>
          <img src={featureImage} alt=":(" />
        </div>
        <div className={`splash__logo ${imageClass}`}>
          <img src={logo} alt="The Hometown Advantage" />
        </div>
      </section>
    );
  }
}
export default withRouter(Splash);
