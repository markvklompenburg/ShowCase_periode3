using System;
using System.Web.Http.ModelBinding;
using Microsoft.AspNetCore.Mvc;
using ShowcaseApi.DAL;
using ShowCase_Friends_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;
using System.Text;
using System.Security.Cryptography;
using Google.Protobuf.WellKnownTypes;
using MySqlX.XDevAPI;


namespace ShowCase_Friends_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        [HttpGet]
        [Route("/GetUser")]
        public IEnumerable<User> Get([FromHeader] string token)
        {
            if (token == null)
            {
                return null;
            }
            else
            {

                List<User> users = null;

                using (var dbContext = new DatabaseContext())
                {
                    users = dbContext.User.ToList();
                }

                return users.Where(x => x.Id.Equals(GetUserIdFromToken(token))).ToArray();
            }
        }

        [HttpGet]
        [Route("/GetUserById")]
        public IEnumerable<User> Get(int userId)
        {
            if (userId == null)
            {
                return null;
            }
            else
            {

                List<User> users = null;

                using (var dbContext = new DatabaseContext())
                {
                    users = dbContext.User.ToList();
                }

                return users.Where(x => x.Id.Equals(userId)).ToArray();
            }
        }

        [HttpPost]
        [Route("/SetUser")]
        public async Task<ActionResult<User>>
        CreateUser([FromBody] User user)
        {
            user.Password = GetHashString(user.Password);

            if (ModelState.IsValid)
            {
                using (var dbContext = new DatabaseContext())
                {
                    dbContext.User.Add(user);
                    dbContext.SaveChanges();
                }
            }

            return user;
        }


        //Login
        [HttpPost]
        [Route("/LoginUser")]
        public async Task<ActionResult<Models.Session>>
        Post([FromBody] Login login)
        {
            string wachtwoord = GetHashString(login.Password);
            string email = login.Email;

            List<User> users = null;

            using (var dbContext = new DatabaseContext())
            {
                users = dbContext.User.ToList();
            }

            User user = users.Where(x => x.Email.Equals(email)).FirstOrDefault();

            if (user == null)
            {
                return null;
            }

            if (user.Email == email && user.Password == wachtwoord)
            {
                Models.Session session = new Models.Session(user.Id, CreateToken(user.Id));

                using (var dbContext = new DatabaseContext())
                {
                    if (dbContext.Session.Where(x => x.UserId.Equals(user.Id)).FirstOrDefault() == null)
                    {

                        dbContext.Session.Add(session);
                        dbContext.SaveChanges();
                    }
                }

                return session;
            }

            return null;
        }

        //Logout
        [HttpPost]
        [Route("/LogoutUser")]
        public async Task<ActionResult<bool>>
        Logout([FromHeader] string token)
        {
            bool succes = true;

            using (var dbContext = new DatabaseContext())
            {
                try{
                    dbContext.Session.Remove(dbContext.Session.Where(x => x.UserId.Equals(GetUserIdFromToken(token))).FirstOrDefault());
                } catch(Exception ex) {
                    succes = false;
                }
                dbContext.SaveChanges();
            }

            return succes;
        }


        //Hashes the password
        static byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        static string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }


        //Create sessiontoken
        static byte[] GetToken(string inputString)
        {
            
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString.ToString()));
        }

        static string CreateToken(int id)
        {
            Random rnd = new Random();

            string number = id.ToString();

            for (int j = 0; j < 20; j++)
            {
                number += rnd.Next(0,9).ToString();
            }

            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetToken(number))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }

        static int GetUserIdFromToken(string token) {

            Models.Session session;

            using (var dbContext = new DatabaseContext())
            {
                session = dbContext.Session.Where(x => x.SessionId.Equals(token)).FirstOrDefault();
            }

            if(session.UserId == null) {
                return -1;
            }

            return session.UserId;
        }

    }
}

