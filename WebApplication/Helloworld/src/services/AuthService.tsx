import { Log, User, UserManager } from 'oidc-client';
import axios from 'axios';

import { Constants, GrantTypes } from '../helpers/Constants';

export class AuthService {
    public userManager: UserManager;

    constructor() {
        // const settings = {
        //     authority: Constants.stsAuthority,
        //     ClientId: Constants.client_id,
        //     redirect_uri: Constants.RedirectUris,
        //     response_type: "id_token token",
        //     scope: "openid profile email api.read",
        //     ClientSecrets: Constants.client_secret
        //     // RequireConsent: Constants.RequireConsent,
        //     // ClientId : Constants.ClientId,
        //     // ClientName :Constants.ClientName,
        //     // AllowedGrantTypes : Constants.AllowedGrantTypes,
        //     // AllowedScopes :Constants.AllowedScopes,
        //     // RedirectUris :Constants.RedirectUris,
        //     // PostLogoutRedirectUris :Constants.PostLogoutRedirectUris,
        //     // AllowedCorsOrigins :Constants.AllowedCorsOrigins,
        //     // AllowAccessTokensViaBrowser :Constants.AllowAccessTokensViaBrowser,
        //     // AccessTokenLifetime :Constants.AccessTokenLifetime
        // };

        var settings = {
            authority: Constants.stsAuthority,
            client_id: Constants.client_id,
            client_secret: Constants.client_secret,
            redirect_uri: `${Constants.RedirectUris}`,
            silent_redirect_uri: `${Constants.apiRoot}/silent-renew.html`,
            // tslint:disable-next-line:object-literal-sort-keys
            post_logout_redirect_uri: `http://localhost:8082`,

            response_type: 'code',
            scope: Constants.scope
        };

        this.userManager = new UserManager(settings);

        Log.logger = console;
        Log.level = Log.INFO;
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public login(): Promise<User> {
        console.log(this.userManager);
        return this.userManager.signinRedirect();
        // return this.userManager.signinPopup();
    }

    public renewToken(): Promise<User> {
        return this.userManager.signinSilent();
    }

    public logout(id_token: string): Promise<User> {
        return this.userManager.signoutRedirect({ 'id_token_hint': id_token, 'post_logout_redirect_uri': "http://localhost:8082" });
    }

    public loginAPI(username: string, password: string): Promise<void> {
        let formData = new FormData();

        formData.append("username", username);
        formData.append("password", password);
        formData.append("client_id", Constants.client_id);
        formData.append("client_secret", Constants.client_secret);
        formData.append("grant_type", GrantTypes.password);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        return axios.post(Constants.apiRoot + '/connect/token', formData, config);
    }

    public testIdentityAuth(token: string) {
        var config = {
            headers: { 'Authorization': "bearer " + token }
        };

        return axios.get(
            Constants.apiRoot + '/identity',
            config
        );
    }

    public handleUserInfo(token: string) {
        let options = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        };

        return axios.get("http://localhost:5000/connect/userinfo", options
        );
    }

    public getFormLogin() {
        return axios.get("account/login", {
            params: {
                ReturnUrl: "http://localhost:5000"
            }
        });
    }
}