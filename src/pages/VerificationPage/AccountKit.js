import React from "react";
import hello from "hellojs";

export class AccountKit extends React.Component {
  state = {
    initialized: false
  };
  componentWillMount() {
    if (!window.AccountKit) {
      (cb => {
        const accountKit = document.createElement("script");
        accountKit.onload = cb;
        accountKit.src = "https://sdk.accountkit.com/en_US/sdk.js";
        document.head.appendChild(accountKit);
      })(() => {
        window.AccountKit_OnInteractive = this.onLoad.bind(this);
        this.setState({ initialized: true });
      });
    }
  }
  componentDidMount() {
    if (!!window.AccountKit) {
      this.setState({ initialized: true });
    }
  }

  onLoad() {
    window.AccountKit.init({
      appId: this.props.clientId,
      state: this.props.csrfToken || "csrf_token",
      version: this.props.apiVersion || "v1.2",
      fbAppEventsEnabled: true,
      // redirect: window.FACEBOOK_REDIRECT_URL,
      debug: true
    });
  }

  loginCallback = response => {
    if (response.status === "PARTIALLY_AUTHENTICATED") {
      var code = response.code;
      var csrf = response.state;
      this.props.verifyCode(code, csrf);
      //this.props.verifyCode();
    } else if (response.status === "NOT_AUTHENTICATED") {
    } else if (response.status === "BAD_PARAMS") {
    }
  };

  formatPhoneNumber = phoneNumber => phoneNumber.substring(3);

  smsLogin = () => {
    const { phoneNumber } = this.props;
    window.AccountKit.login(
      "PHONE",
      { countryCode: "+234", phoneNumber: this.formatPhoneNumber(phoneNumber) }, // will use default values if not specified
      this.loginCallback
    );
  };

  emailLogin = () => {
    const { email } = this.props;
    window.AccountKit.login(
      "EMAIL",
      { emailAddress: email },
      this.loginCallback
    );
  };
  render() {
    return this.state.initialized
      ? this.props.render(this.emailLogin, this.smsLogin)
      : null;
  }
}

export class SocialButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false
    };
  }

  componentDidMount() {
    const { redirect_uri, oauth_proxy, client_id } = this.props;
    this.hello_instance = hello.init(
      { linkedin: client_id },
      {
        scope: ["basic", "email"],
        redirect_uri,
        oauth_proxy
      }
    );
    this.hello_instance.services.linkedin = Object.assign(
      this.hello_instance.services.linkedin,
      {
        get: {
          me:
            "people/~:(picture-url,first-name,headline,last-name,id,positions,summary,location,email-address,public-profile-url)",
          "me/share": "people/~/network/updates?count=@{limit|250}"
        }
      }
    );
    this.hello_instance.on("auth.login", this.fetchData.bind(this));
  }

  componentWillUnmount() {
    this.hello_instance.off("auth.login");
  }

  fetchData() {
    this.hello_instance("linkedin")
      .api("me")
      .then(response => {
        console.log(response);
        this.props.postLogin(response);
        hello
          .logout("linkedin")
          .then(
            () => console.log("signed out"),
            e => console.log("Signed out error: " + e.error.message)
          );
      });
  }

  onLogin() {
    this.setState({ loading: true });
    this.hello_instance
      .login("linkedin")
      .then(this.fetchData.bind(this), error => {
        console.log(error);
        this.props.toggleNotification({
          kind: "error",
          display: true,
          text: error.error.message
        });
      });
  }

  render() {
    return this.props.render(this.state, this.onLogin.bind(this));
  }
}
