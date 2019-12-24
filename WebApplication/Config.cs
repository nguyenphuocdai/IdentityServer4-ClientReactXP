using System.Collections.Generic;
using IdentityServer4;
using IdentityServer4.Models;

namespace WebApplication
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("resourceapi", "Resource API")
                {
                    Scopes = {new Scope("api.read")}
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                new Client {
                    //RequireConsent = false,
                    //ClientId = "react_spa",
                    //ClientName = "React SPA",
                    //AllowedGrantTypes = GrantTypes.Implicit,
                    //AllowedScopes = { "openid", "profile", "email", "api.read" },
                    //RedirectUris = {"http://localhost:8082/auth-callback"},
                    //PostLogoutRedirectUris = {"http://localhost:8082/"},
                    //AllowedCorsOrigins = {"http://localhost:8082"},
                    //AllowAccessTokensViaBrowser = true,
                    //AccessTokenLifetime = 3600,

                    ClientId = "react_spa",
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    RedirectUris = { "http://localhost:8082/signin-callback.html" },
                    PostLogoutRedirectUris = {"http://localhost:8082/"},
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowedScopes = { "api.read", "openid"},
                    RequireClientSecret = false,
                    RequireConsent = false,
                    AllowAccessTokensViaBrowser = true
                    
                },
                new Client {
                    //RequireConsent = false,
                    //ClientId = "react_spa",
                    //ClientName = "React SPA",
                    //AllowedGrantTypes = GrantTypes.Implicit,
                    //AllowedScopes = { "openid", "profile", "email", "api.read" },
                    //RedirectUris = {"http://localhost:8082/auth-callback"},
                    //PostLogoutRedirectUris = {"http://localhost:8082/"},
                    //AllowedCorsOrigins = {"http://localhost:8082"},
                    //AllowAccessTokensViaBrowser = true,
                    //AccessTokenLifetime = 3600,

                    ClientId = "mobile_spa",
                    // secret for authentication
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    RedirectUris = { "foobarmobile://success?code=1337" },
                    PostLogoutRedirectUris = {"http://localhost:8082/"},
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowedScopes = { "api.read", "openid"},
                    RequireClientSecret = false,
                    RequireConsent = false,
                    RequirePkce = true,
                    AllowPlainTextPkce = true,
                    AllowOfflineAccess = true
                },
            };
        }
    }
}