//using AuthServer.Infrastructure.Constants;
//using IdentityServer4.Test;
//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Logging;
//using System.Threading.Tasks;
//using WebApplication.Controllers.Model;

//namespace WebApplication.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class RegisterController : ControllerBase
//    {
//        private readonly TestUserStore _users;
//        private readonly UserManager<RegisterRequestModel> _userManager;

//        private readonly ILogger<LoginController> _logger;

//        public RegisterController()
//        {
//        }

//        public RegisterController(ILogger<LoginController> logger, TestUserStore users = null)
//        {
//            _users = users ?? new TestUserStore(TestUsers.Users);
//            //_userManager = userManager;
//            _logger = logger;
//        }

//        [HttpPost]
//        public async Task<IActionResult> Post([FromBody]RegisterRequestModel model)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }

//            var user = new RegisterRequestModel { Email = model.Email, Name= model.Name, Password = model.Password };

//            var result = await _userManager.CreateAsync(user, model.Password);

//            if (!result.Succeeded) return BadRequest(result.Errors);

//            await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("name", user.Name));
//            await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("email", user.Email));
//            await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("password", user.Password));
//            await _userManager.AddClaimAsync(user, new System.Security.Claims.Claim("role", Roles.Consumer));

//            return Ok();
//        }
//    }
//}
