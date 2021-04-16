// @flow
import passport from "@outlinewiki/koa-passport";
import Router from "koa-router";
import { capitalize } from "lodash";
import { Strategy as KeycloakStrategy } from "passport-keycloak-oauth2-oidc";
import accountProvisioner from "../commands/accountProvisioner";
import env from "../env";
import auth from "../middlewares/authentication";
import passportMiddleware from "../middlewares/passport";
import { getAllowedDomains } from "../utils/authentication";
import { StateStore } from "../utils/passport";

const router = new Router();
const providerName = "keycloak";
const KEYCLOAK_DOMAIN = process.env.KEYCLOAK_DOMAIN;
const KEYCLOAK_AUTH_SERVER = process.env.KEYCLOAK_AUTH_SERVER;
const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET;
const KEYCLOAK_PROVIDER_NAME = process.env.KEYCLOAK_PROVIDER_NAME || providerName;
const KEYCLOAK_TEAM_NAME = process.env.KEYCLOAK_TEAM_NAME || KEYCLOAK_PROVIDER_NAME;
const KEYCLOAK_TEAM_LOGO = process.env.KEYCLOAK_TEAM_LOGO;

const scopes = [
  "email",
  "profile",
  "roles",
];

export const config = {
  name: KEYCLOAK_PROVIDER_NAME,
  enabled: !!KEYCLOAK_CLIENT_ID,
};

if (KEYCLOAK_CLIENT_ID) {
  passport.use(
    new KeycloakStrategy(
      {
        authServerURL: KEYCLOAK_AUTH_SERVER,
        realm: KEYCLOAK_REALM,
        clientID: KEYCLOAK_CLIENT_ID,
        clientSecret: KEYCLOAK_CLIENT_SECRET,
        callbackURL: `${env.URL}/auth/${providerName}.callback`,
        passReqToCallback: true,
        scope: scopes
      },
      async function (req, accessToken, refreshToken, profile, done) {
        try {
          const keydomain = profile.email.split("@")[1];
          const subdomain = profile.realm || keydomain.split(".")[0];
          const teamName = KEYCLOAK_TEAM_NAME || capitalize(subdomain);
          const domain = KEYCLOAK_DOMAIN || keydomain;

          const result = await accountProvisioner({
            ip: req.ip,
            team: {
              name: teamName,
              domain,
              subdomain,
              avatarUrl: KEYCLOAK_TEAM_LOGO,
            },
            user: {
              name: profile.name,
              email: profile.email,
            },
            authenticationProvider: {
              name: providerName,
              providerId: profile.realm,
            },
            authentication: {
              providerId: profile.id,
              accessToken,
              refreshToken,
              scopes,
            },
          });
          return done(null, result.user, result);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  router.get(providerName, passport.authenticate(providerName, {scope: scopes}));

  router.get(
    `${providerName}.callback`,
    auth({ required: false }),
    passportMiddleware(providerName)
  );
}

export default router;
