using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Infrastructure.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Model;

namespace API.Controllers
{
   
    [ApiController]
    [Route ("[controller]")]
    public class AccountController: ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly TokenService _tokenService;
        private readonly EmailSender _emailSender;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, 
            TokenService tokenService, EmailSender emailSender)
        {
            _tokenService = tokenService;
            _emailSender = emailSender;
            _signInManager = signInManager;
            _userManager = userManager;
        
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto){

             if (!ModelState.IsValid){
                return ValidationProblem();
            }

            var user = await _userManager
                .FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized("Invalid email");

            if (user.UserName == "test") user.EmailConfirmed= true;

            if (!user.EmailConfirmed) return Unauthorized("Email not convirmed");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);
                return CreateUserObject(user);
            }

            return Unauthorized("Invalid Password");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto){

             if (!ModelState.IsValid){
                return ValidationProblem();
            }
            
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email)){
                
                ModelState.AddModelError("email", "Email jest zajęty");
                return ValidationProblem();
            }
             if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName)){
                 ModelState.AddModelError("userName", "Nazwa użytkownika jest zajęta");
                return ValidationProblem();
            }

            var user = new User {
                DisplayName= registerDto.DisplayName,
                Email= registerDto.Email,
                UserName= registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded){
                await SetRefreshToken(user);
                //return CreateUserObject(user);
                //if (!result.Succeeded) return BadRequest("Problem registering user");
                
               // var origin = Request.Headers["origin"];
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

               // var verifyUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
                var callback = Url.Action(nameof(VerifyEmail), "Account", new {token=token, email=user.Email}, Request.Scheme);
                var message = $"<p>Kliknij poniższy link do potwierdzenia adresu Email: </p><a href='{callback}'>Potwierdź email</a>";

                await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

                return Ok("Rejestracja przebiegła poprawnie- proszę potwierdź email");
            }


            return BadRequest("Problem registering user");
        }

        [AllowAnonymous]
        [HttpPost("verifyEmail")]
        public async Task<IActionResult> VerifyEmail(emailDto email){

             if (!ModelState.IsValid){
                return ValidationProblem();
            }

            var user = await _userManager.FindByEmailAsync(email.Email);
                if (user == null || email.Token == null) return Unauthorized();

            var decodedTokenBytes = WebEncoders.Base64UrlDecode(email.Token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);

            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);

            if (!result.Succeeded) return BadRequest("Could not verify email address");

            return Ok("Email potwierdzony - teraz możesz się zalogować");
        }

        [AllowAnonymous]
        [HttpPost("resendEmailConfirmationLink")]
        public async Task<IActionResult> ResendEmailConfirmationLink(emailDto email){

             if (!ModelState.IsValid){
                return ValidationProblem();
            }

            var user = await _userManager.FindByEmailAsync(email.Email);
             if (user == null) return Unauthorized();

            // var origin = Request.Headers["origin"];
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));
                
                var callback = Url.Action(nameof(VerifyEmail), "Account", new {token=token, email=user.Email}, Request.Scheme);
               // var passwordresetUrl = $"{origin}/account/verifyEmail?token={token}&email={user.Email}";
                var message = $"<p>Kliknij poniższy link do potwierdzenia adresu Email: </p><a href='{callback}'>Potwierdź email</a>";

                await _emailSender.SendEmailAsync(user.Email, "Please verify email", message);

                return Ok("Przesłano ponownie link weryfikacyjny");
        }

        [AllowAnonymous]
       // [ValidateAntiForgeryToken]
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(emailDto email){

            if (!ModelState.IsValid){
                return ValidationProblem();
            }

            var user = await _userManager.FindByEmailAsync(email.Email);
                if (user == null) 
                    return Unauthorized();

            var origin = Request.Headers["Host"];
            Console.WriteLine(origin);
            var tokenToSend = await _userManager.GeneratePasswordResetTokenAsync(user);
                tokenToSend = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(tokenToSend));
                
            //var verifyUrl = $"{origin}/account/ResetPassword?token={token}&email={user.Email}";
            var callback = Url.Action(nameof(ResetPassword), "Account", new {token=tokenToSend, email=user.Email}, Request.Scheme);
               
            var message = $"<p>Kliknij poniższy link do resetu hasła: </p><a href='{callback}'>resetuj hasło</a>";

            await _emailSender.SendEmailAsync(user.Email, "Magserv password reset", message);

            return Ok("Przesłano link do resetu hasła na twój adres email");
        }

        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPassword){

             if (!ModelState.IsValid){
                return ValidationProblem();
            }

            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
                if (user == null) return Unauthorized();

            var decodedTokenBytes = WebEncoders.Base64UrlDecode(resetPassword.Token);
            var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);


            var result = await _userManager.ResetPasswordAsync(user, decodedToken, resetPassword.Password);

            if (!result.Succeeded) return BadRequest("Could not reset your password");

            return Ok("Poprawnie zresetowano hasło");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser(){
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            await SetRefreshToken(user);
            return CreateUserObject(user);
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken(){

            var refreshToken = Request.Cookies["refreshToken"];

            var user = await _userManager.Users.Include(r => r.RefreshToken)
                    .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));
                
            if (user ==null) return Unauthorized();
            
            var oldToken = user.RefreshToken.SingleOrDefault(x => x.Token == refreshToken);

                if (oldToken != null && !oldToken.IsActive){
                    return Unauthorized();
                }

                return CreateUserObject(user);
        }

        private async Task SetRefreshToken(User user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();
            user.RefreshToken.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions{
                HttpOnly= true,
                Expires= DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }
        private UserDto CreateUserObject(User user)
        {
            return new UserDto{
                    DisplayName= user.DisplayName,
                    Image= null,
                    Token= _tokenService.CreateToken(user),
                    UserName= user.UserName
                };
        }
    }
}