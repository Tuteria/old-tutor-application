import React from "react";
import { SocialIconButton } from "../simple/Button";
import axios from "axios";
export function myFetch(method, url, params, callback) {
  var myInit = {
    method: method
  };
  if (method === "POST") {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("X-Requested-With", "XMLHttpRequest");
    // myHeaders.append("X-CSRFToken", window.APP_CSRF_TOKEN);
    // myInit = Object.assign(myInit, params, { headers: myHeaders });
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      })
      .then(response => {
        callback(response);
      });
  } else {
    var myRequest = new Request(url, myInit);
    fetch(myRequest)
      .then(response => response.json())
      .then(data => callback(data));
  }
}

function getLongLivedToken(
  access_code,
  client_id,
  redirect_url,
  machine_code = null
) {
  let url = `https://graph.facebook.com/oauth/access_token?code=${access_code}&client_id=${client_id}&redirect_uri=${redirect_url}`;
  if (!!machine_code) {
    url = `${url}&machine_code=${machine_code}`;
  }
  let result = new Promise((resolve, reject) => {
    myFetch("GET", url, {}, response => {
      console.log(response);
      resolve(response);
    });
  });
  return result;
}

function updateServer(url, data, access_token, client_id, redirect_uri) {
  var result = new Promise((resolve, reject) => {
    myFetch(
      "POST",
      `${url}?access_token=${access_token}`,
      // { body: JSON.stringify(data) },
      data,
      data => {
        console.log(data);
        getLongLivedToken(data.code, client_id, redirect_uri).then(data =>
          resolve(data)
        );
      }
    );
  });
  return result;
}

export function testAPI(url, access_token, { client_id, redirect_uri }) {
  console.log("Welcome!  Fetching your information.... ");
  const promise = new Promise((resolve, reject) => {
    window.FB.api("/me?fields=id,name,email,birthday,link", function(response) {
      console.log("Successful login for: " + response.name);
      console.log(response);
      resolve(response);
      // updateServer(url, response, access_token, client_id, redirect_uri).then(
      //   data => resolve({ data, response })
      // );
    });
  });
  return promise;
}

class FacebookButton extends React.Component {
  state = {
    isSdkLoaded: false,
    clicked: false
  };
  componentDidMount() {
    this._isMounted = true;
    if (document.getElementById("facebook-jssdk")) {
      this.sdkLoaded();
      return;
    }
    this.setFbAsyncInit();
    this.loadSdkAsync();
    let fbRoot = document.getElementById("fb-root");
    if (!fbRoot) {
      fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }
  }
  setFbAsyncInit() {
    const { appId, version = 2.8 } = this.props;
    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId,
        xfbml: true,
        cookie: true
      });
      this.setStateIfMounted({ isSdkLoaded: true });
      window.FB
        .getLoginStatus
        // this.checkLoginAfterRefresh
        ();
    };
  }
  setStateIfMounted(state) {
    if (this._isMounted) {
      this.setState(state);
    }
  }
  sdkLoaded() {
    this.setState({ isSdkLoaded: true });
  }

  onLogin = () => {
    this.setState({ clicked: true });
    if (!!window.FB) {
      window.FB.login(response => this.checkLoginAfterRefresh(response), {
        scope: "public_profile,email,user_birthday,user_link"
      });
    }
  };
  checkLoginAfterRefresh = response => {
    const {
      validateUrl,
      appId,
      redirectUrl,
      postLogin = () => {}
    } = this.props;
    console.log("statusChangeCallback");
    console.log(response);
    if (response.status === "connected") {
      testAPI(validateUrl, response.authResponse.accessToken, {
        client_id: appId,
        redirect_uri: redirectUrl
      }).then(data => {
        if (this.state.clicked) {
          postLogin(data, response.authResponse.accessToken);
        }
      });
    } else {
      // The person is not logged into your app or we are unable to tell.
      console.log("not logged in");
    }
  };
  loadSdkAsync() {
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
  render() {
    const { toOpenModal, openModal } = this.props;
    return (
      <SocialIconButton
        onClick={toOpenModal ? openModal : this.onLogin}
        className="facebook"
        icon={this.props.icon}
        connectColor={this.props.connectColor}
        name={this.props.transparent ? "facebook2" : "facebook3"}
        kind="facebook"
        outline={this.props.transparent}
        disabled={this.props.disabled}
        full_width={this.props.full_width}
        big={this.props.big}
        top={this.props.top}
        small={this.props.small}
        css={this.props.css}
        iconStyle={this.props.iconStyle}
      >
        {this.state.clicked && this.props.loadingText
          ? this.props.loadingText
          : this.props.text}
      </SocialIconButton>
    );
  }
}
export default FacebookButton;
