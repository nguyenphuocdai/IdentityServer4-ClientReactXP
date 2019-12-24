//using AuthServer.Infrastructure.Data.Identity;
//using IdentityServer4.Services;
//using IdentityServer4.Validation;
//using Microsoft.AspNetCore.Builder;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using System;

//namespace WebApplication
//{
//    public class Startup
//    {
//        public Startup(IConfiguration configuration)
//        {
//            Configuration = configuration;
//        }

//        public IConfiguration Configuration { get; }

//        // This method gets called by the runtime. Use this method to add services to the container.
//        public void ConfigureServices(IServiceCollection services)
//        {

//            services.AddControllersWithViews();

//            // In production, the React files will be served from this directory
//            services.AddSpaStaticFiles(configuration =>
//            {
//                //configuration.RootPath = "ClientApp/build";
//                configuration.RootPath = "Helloworld/dist-web";
//            });


//            //services.AddIdentityServer(options =>
//            //{
//            //    options.Events.RaiseErrorEvents = true;
//            //    options.Events.RaiseFailureEvents = true;
//            //    options.Events.RaiseInformationEvents = true;
//            //    options.Events.RaiseSuccessEvents = true;
//            //})
//            //   .AddInMemoryApiResources(Config.GetApis())
//            //   .AddInMemoryIdentityResources(Config.GetIdentityResources())
//            //   .AddInMemoryClients(Config.GetClients())
//            //   .AddTestUsers(TestUsers.Users)
//            //   .AddDeveloperSigningCredential(persistKey: false);

//            services.AddIdentityServer().AddDeveloperSigningCredential()
//                // this adds the operational data from DB (codes, tokens, consents)
//                .AddOperationalStore(options =>
//                {
//                    options.ConfigureDbContext = builder => builder.UseSqlServer(Configuration.GetConnectionString("Default"));
//                    // this enables automatic token cleanup. this is optional.
//                    options.EnableTokenCleanup = true;
//                    options.TokenCleanupInterval = 30; // interval in seconds
//                })
//                .AddInMemoryIdentityResources(Config.GetIdentityResources())
//                .AddInMemoryApiResources(Config.GetApiResources())
//                .AddInMemoryClients(Config.GetClients())
//                .AddAspNetIdentity<AppUser>();
//            //services.AddAuthentication()
//            //    .AddGoogle("Google", options =>
//            //    {
//            //        options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

//            //        //options.ClientId = Configuration["Secret:GoogleClientId"];
//            //        options.ClientId = "137132063515-994u522lsm6ph9vlqveorhddohlflesl.apps.googleusercontent.com";
//            //        options.ClientSecret = "ed8ZZYo0Dx670b2Z45sIBeLR";
//            //        //options.ClientSecret = Configuration["Secret:GoogleClientSecret"];
//            //    })
//            //    //.AddOpenIdConnect("aad", "Sign-in with Azure AD", options =>
//            //    //{
//            //    //    options.Authority = "https://login.microsoftonline.com/common";
//            //    //    options.ClientId = "https://leastprivilegelabs.onmicrosoft.com/38196330-e766-4051-ad10-14596c7e97d3";

//            //    //    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
//            //    //    options.SignOutScheme = IdentityServerConstants.SignoutScheme;

//            //    //    options.ResponseType = "id_token";
//            //    //    options.CallbackPath = "/signin-aad";
//            //    //    options.SignedOutCallbackPath = "/signout-callback-aad";
//            //    //    options.RemoteSignOutPath = "/signout-aad";

//            //    //    options.TokenValidationParameters = new TokenValidationParameters
//            //    //    {
//            //    //        ValidateIssuer = false,
//            //    //        ValidAudience = "165b99fd-195f-4d93-a111-3e679246e6a9",

//            //    //        NameClaimType = "name",
//            //    //        RoleClaimType = "role"
//            //    //    };
//            //    //})
//            //    .AddLocalApi(options =>
//            //    {
//            //        options.ExpectedScope = "api";
//            //    });

//            // preserve OIDC state in cache (solves problems with AAD and URL lenghts)
//            services.AddOidcStateDataFormatterCache("aad");

//            // add CORS policy for non-IdentityServer endpoints
//            //services.AddCors(options =>
//            //{
//            //    options.AddPolicy("api", policy =>
//            //    {
//            //        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
//            //    });
//            //});

//            // demo versions (never use in production)
//            services.AddTransient<IRedirectUriValidator, DemoRedirectValidator>();
//            services.AddTransient<ICorsPolicyService, DemoCorsPolicy>();

//            //services.AddCors(); // Make sure you call this previous to AddMvc
//            services.AddCors(options =>

//            {

//                options.AddPolicy("AllowMyOrigin",
//                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
//            });

//            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
//        }

//        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//        [Obsolete]
//        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//        {
//            app.UseCors("AllowMyOrigin");

//            if (env.IsDevelopment())
//            {
//                app.UseDeveloperExceptionPage();
//            }
//            else
//            {
//                app.UseExceptionHandler("/Error");
//                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//                app.UseHsts();
//            }

//            app.UseHttpsRedirection();
//            app.UseStaticFiles();
//            app.UseSpaStaticFiles();

//            app.UseRouting();

//            app.UseEndpoints(endpoints =>
//            {
//                endpoints.MapControllerRoute(
//                    name: "default",
//                    pattern: "{controller}/{action=Index}/{id?}");
//            });
//            app.UseSpa(spa =>
//            {
//                spa.Options.SourcePath = "Helloworld";
//                //spa.Options.SourcePath = "ClientApp";

//                if (env.IsDevelopment())
//                {
//                    //spa.UseReactDevelopmentServer(npmScript: "start:web");
//                    //spa.UseReactDevelopmentServer(npmScript: "start");
//                    spa.UseProxyToSpaDevelopmentServer("http://localhost:8082");
//                }
//            });

//            //app.UseSerilogRequestLogging();

//            //app.UseCors("api");
//            //app.UseCors();



//            app.UseIdentityServer();
//            app.UseAuthorization();

//            //app.UseEndpoints(endpoints =>
//            //{
//            //    endpoints.MapDefaultControllerRoute();
//            //});
//        }
//    }
//}

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Net;
using IdentityServer4.EntityFramework.Storage;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Joonasw.AspNetCore.SecurityHeaders;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using WebApplication.Extension;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace WebApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentityServer()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddTestUsers(TestUsers.Users)
                .AddDeveloperSigningCredential(persistKey: false);
            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader().WithExposedHeaders("WWW-Authenticate")));

            services.AddControllersWithViews();
            services.AddSpaStaticFiles(configuration =>
                            {
                                //configuration.RootPath = "ClientApp/build";
                                configuration.RootPath = "Helloworld/dist-web";
                            });
            services.AddDistributedMemoryCache();

            //services.AddAuthentication()
            //    .AddIdentityServerAuthentication("oidc", options =>
            //    {
            //        options.SaveToken = true;
            //    });
            services.AddMvc(options => options.EnableEndpointRouting = false).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);


            services.AddAuthentication(options =>
                {
                    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie()
                .AddOpenIdConnect(options =>
                {
                    options.Authority = "http://localhost:5000/";
                    options.ClientId = "react_spa";
                    options.SignedOutRedirectUri = "http://localhost:8082/";
                    options.SaveTokens = true;
                    options.RequireHttpsMetadata = false;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    if (error != null)
                    {
                        context.Response.AddApplicationError(error.Error.Message);
                        await context.Response.WriteAsync(error.Error.Message).ConfigureAwait(false);
                    }
                });
            });
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCors("AllowAll");

            //app.UseHttpsRedirection();
            app.UseIdentityServer();

            //app.UseAuthentication();
            app.UseAuthorization();

           
            app.UseRouting();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "Helloworld";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start:web");
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:8082");
                }
            });
           
            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapDefaultControllerRoute();
            //});
        }
    }
}

