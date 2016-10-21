using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.Swagger.Model;
using ExampleApi.Repository;

namespace ExampleApi
{
    public class Startup
    {
        private bool isDev;
        private Info apiInfo = new Info()
        {
            Version = "v1",
            Title = "Example Hybrid Web App Api",
            Description = "A simple test api",
            TermsOfService = "None"
        };

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            isDev = env.IsEnvironment("Development");

            if (isDev)
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IPersonRepository, PersonRepository>();

            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddMvc(o =>
            {
                o.UseExceptionErrorFilters(isDev);
            });

            services.AddConventionalSwagger(apiInfo);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseConventionalSwagger(apiInfo);

            app.UseMvc();
        }
    }
}
