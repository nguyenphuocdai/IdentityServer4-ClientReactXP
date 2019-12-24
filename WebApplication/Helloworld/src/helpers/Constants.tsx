export class Constants {
    public static stsAuthority = 'http://localhost:5000';
    public static apiRoot = 'http://localhost:5000';

    public static client_id = "react_spa";
    public static client_secret = "secret";
    public static scope = "api.read";
    public static clientScope = 'openid profile email api';
    public static RedirectUris = "http://localhost:8082/signin-callback.html";
}

export class GrantTypes {
    public static password = "password";
}