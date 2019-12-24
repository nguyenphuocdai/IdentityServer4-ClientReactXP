using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;
using System;
using Microsoft.AspNetCore;

namespace WebApplication
{
    public class Program
    {
        //public static void Main(string[] args)
        //{
        //    CreateWebHostBuilder(args).Build().Run();
        //}

        //public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        //    WebHost.CreateDefaultBuilder(args)
        //    .UseKestrel().UseIISIntegration()
        //        .UseStartup<Startup>();
        public static void Main(string[] args)
        {
            Console.Title = "IdentityServer";

            BuildWebHostBuilder(args).Build().Run();
        }

        public static IHostBuilder BuildWebHostBuilder(string[] args)
        {
            return Microsoft.Extensions.Hosting.Host.CreateDefaultBuilder(args)
                //.UseSerilog((ctx, config) =>
                //{
                //    config.MinimumLevel.Debug()
                //        .MinimumLevel.Debug()
                //        .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                //        .MinimumLevel.Override("System", LogEventLevel.Warning)
                //        .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
                //        .Enrich.FromLogContext();

                //    if (ctx.HostingEnvironment.IsDevelopment())
                //    {
                //        config.WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}");
                //    }
                //    else if (ctx.HostingEnvironment.IsProduction())4
                //    {
                //        //config.WriteTo.File(@"D:\home\LogFiles\Application\identityserver.txt",
                //        //    fileSizeLimitBytes: 1_000_000,
                //        //    rollOnFileSizeLimit: true,
                //        //    shared: true,
                //        //    flushToDiskInterval: TimeSpan.FromSeconds(1));
                //    }
                //})
                //.ConfigureAppConfiguration((ctx, builder) =>
                //{
                //    var config = builder.Build();
                //    var tokenProvider = new AzureServiceTokenProvider();
                //    var kvClient = new KeyVaultClient((authority, resource, scope) => tokenProvider.KeyVaultTokenCallback(authority, resource, scope));

                //    builder.AddAzureKeyVault(config["KeyVault:BaseUrl"], kvClient, new DefaultKeyVaultSecretManager());
                //})
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
        }
        //public static IWebHostBuilder BuildWebHostBuilder(string[] args) =>
        //    Host.CreateDefaultBuilder(args)
        //        .UseStartup<Startup>()
        //        .UseUrls("http://localhost:5000");
    }
}
