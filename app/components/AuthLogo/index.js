// @flow
import * as React from "react";
import SlackLogo from "../SlackLogo";
import GoogleLogo from "./GoogleLogo";
import KeycloakLogo from "./KeycloakLogo";

type Props = {|
  providerName: string,
|};

export default function AuthLogo({ providerName }: Props) {
  switch (providerName) {
    case "slack":
      return <SlackLogo size={16} />;
    case "google":
      return <GoogleLogo size={16} />;
    case "keycloak":
      return <KeycloakLogo size={16} />;
    default:
      return null;
  }
}
