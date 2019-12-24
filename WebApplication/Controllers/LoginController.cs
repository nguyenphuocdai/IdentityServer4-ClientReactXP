//using System.Net.Http;
//using IdentityServer4.Events;
//using IdentityServer4.Services;
//using IdentityServer4.Stores;
//using IdentityServer4.Test;
//using Microsoft.AspNetCore.Authentication;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;
//using IdentityModel.Client;
//using IdentityServer4.Models;
//using WebApplication.Controllers.Model;

//namespace WebApplication.Controllers
//{
//    [ApiController]
//     [Route("[controller]")]
//    public class LoginController : ControllerBase
//    {
//        private readonly TestUserStore _users;
//        private readonly IIdentityServerInteractionService _interaction;
//        private readonly IClientStore _clientStore;
//        private readonly IAuthenticationSchemeProvider _schemeProvider;
//        private readonly IEventService _events;
//        static HttpClient _tokenClient = new HttpClient();
//        //static DiscoveryCache _cache = new DiscoveryCache("http://localhost:5000");

//        public LoginController(IIdentityServerInteractionService interaction,
//            IClientStore clientStore,
//            IAuthenticationSchemeProvider schemeProvider,
//            IEventService events,
//            TestUserStore users = null)
//        {
//            _users = users ?? new TestUserStore(TestUsers.Users);

//            _interaction = interaction;
//            _clientStore = clientStore;
//            _schemeProvider = schemeProvider;
//            _events = events;
//        }

//        [HttpPost]
//        public async Task<TokenResponse> Post([FromBody]LoginInputModel model)
//        {
//            // check if we are in the context of an authorization request
//            //var context = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);

//            if (ModelState.IsValid)
//            {
//                if (_users.ValidateCredentials(model.Username, model.Password))
//                {
//                    var user = _users.FindByUsername(model.Username);
//                    await _events.RaiseAsync(new UserLoginSuccessEvent(user.Username, user.SubjectId, user.Username));
//                    AuthenticationProperties props = null;

//                    await HttpContext.SignInAsync(user.SubjectId, user.Username, props);
//                }
//                //var disco = await _cache.GetAsync();
//                //if (disco.IsError) return null;

//                var response = await _tokenClient.RequestPasswordTokenAsync(new PasswordTokenRequest
//                {
//                    Address = "https://localhost:5001/connect/token",

//                    ClientId = model.ClientID,
//                    ClientSecret = model.ClientSecret,
//                    GrantType =  GrantType.ResourceOwnerPassword,
//                    UserName = model.Username,
//                    Password = model.Password,

//                    //Scope = model.Scope
//                });
//                return response;
//            }
//            return null;
//        }
//    }
//}
