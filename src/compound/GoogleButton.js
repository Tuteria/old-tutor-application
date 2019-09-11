import React from "react";
import { SocialIconButton } from "../simple/Button";
import { myFetch } from "../compound/FacebookButton";
import { ResetPasswordContainer } from "../pages/ExternalPages/TutorLandingPage/ModalForm";

export const responseHandler = (url, googleUser) => {
  const result = new Promise((resolve, reject) => {
    var id_token = googleUser.getAuthResponse().id_token;
    let body = { token: id_token };
    myFetch("POST", url, body, response => {
      console.log(response);
      resolve(response);
    });
  });
  return result;
};

class GoogleButton extends React.Component {
  state = {
    clicked: false,
    disabled: true
  };
  componentDidMount() {
    const { client_id } = this.props;
    ((d, s, id, callback) => {
      let js,
        gs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        this.setState({ disabled: false });
      } else {
        js = d.createElement(s);
        js.id = id;
        js.src = "https://apis.google.com/js/api:client.js";
        gs.parentNode.insertBefore(js, gs);
        js.onload = callback;
      }
    })(document, "script", "google-platform", () => {
      window.gapi.load("auth2", () => {
        this.setState({ disabled: false });
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.client.load("plus", "v1").then(() => {
            window.gapi.auth2.init({
              client_id,
              cookiepolicy: "single_host_origin",
              scope: "https://www.googleapis.com/auth/plus.login"
            });
          });
        }
      });
    });
  }
  clickHandler = () => {
    const { postLogin = () => {}, validateUrl, gPlus = false } = this.props;
    if (Boolean(window.gapi)) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      if (Boolean(auth2)) {
        auth2.signIn().then(googleUser => {
          this.setState({
            clicked: true
          });
          if (gPlus) {
            var request = window.gapi.client.plus.people.get({
              userId: "me"
            });
            request.execute(resp => {
              postLogin({ url: resp.url });
            });
          } else {
            // var name = googleUser.getBasicProfile().getName();
            // var email = googleUser.getBasicProfile().getEmail();
            // var google_id = googleUser.getBasicProfile().getId();
            var id_token = googleUser.getAuthResponse().id_token;
            postLogin(id_token);
          }
          // var name = googleUser.getBasicProfile().getName();
          // var email = googleUser.getBasicProfile().getEmail();
          // var google_id = googleUser.getBasicProfile().getId();
          // var id_token = googleUser.getAuthResponse().id_token;
          // postLogin();
        });
      }
    }
  };

  render() {
    return (
      <SocialIconButton
        onClick={this.clickHandler}
        className="google"
        name="google"
        kind="google"
        icon={this.props.icon}
        outline={this.props.transparent}
        disabled={this.state.disabled}
        full_width={this.props.full_width}
        big={this.props.big}
        small={this.props.small}
        css={this.props.css}
        top={this.props.top}
        iconStyle={this.props.iconStyle}
        connectColor={this.props.connectColor}
      >
        {this.state.clicked && this.props.loadingText
          ? this.props.loadingText
          : this.props.text}
      </SocialIconButton>
    );
  }
}

export default GoogleButton;
