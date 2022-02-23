using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MailKit.Net.Smtp;
using MimeKit;
using Model;

namespace Infrastructure.Email
{
    public class EmailSender
    {
        private readonly IConfiguration _config;

        public EmailSender(IConfiguration config)
        {
            _config = config;
        }
      
        public async Task SendEmailAsync(string userEmail, string emailSubject, string msg)
        {        
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_config["EmailConfiguration:From"]));
            message.To.Add(new MailboxAddress(userEmail));
            message.Subject= emailSubject;
            message.Body= new TextPart(MimeKit.Text.TextFormat.Html) { Text = msg };

            await SendAsync(message);

        }
        private async Task SendAsync(MimeMessage mailMessage)
    {
        using (var client = new SmtpClient())
        {
            try
            {
                await client.ConnectAsync(_config["EmailConfiguration:SmtpServer"], int.Parse(_config["EmailConfiguration:Port"]), true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                await client.AuthenticateAsync(_config["EmailConfiguration:Username"], _config["EmailConfiguration:Password"]);
                await client.SendAsync(mailMessage);
            }
            catch
            {
                //log an error message or throw an exception or both.
                throw;
            }
            finally
            {
                await client.DisconnectAsync(true);
                client.Dispose();
            }
        }
    }
    }
   
}

// private readonly IConfiguration _config;

//         public EmailSender(IConfiguration config)
//         {
//             _config = config;
//         }

//         public async Task SendEmailAsync(string userEmail, string emailSubject, string msg){
//             var client = new SendGridClient(_config["SendGrid:key"]);
//             var message = new SendGridMessage{
//                 From = new EmailAddress("krtfpls@gmail.com", _config["SendGrid:User"]),
//                 Subject = emailSubject,
//                 PlainTextContent = msg,
//                 HtmlContent = msg
//             };

//             message.AddTo(new EmailAddress(userEmail));
//             message.SetClickTracking(false, false);

//             await client.SendEmailAsync(message);
//         }