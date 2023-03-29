using System;
using Microsoft.AspNetCore.Mvc;
using ShowCase_Friends_API.Models;
using ShowcaseApi.DAL;
using System.Web.Http.ModelBinding;

namespace ShowCase_Friends_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserGroupController : ControllerBase
    {

        [HttpPost]
        [Route("/SetUserGroup")]
        public async Task<ActionResult<UserGroup>>
        CreateUser([FromBody] UserGroup userGroup)
        {
            if (ModelState.IsValid)
            {
                using (var dbContext = new DatabaseContext())
                {
                    dbContext.UserGroup.Add(userGroup);
                    dbContext.SaveChanges();
                }
            }

            return userGroup;
        }

        [HttpPost]
        [Route("/SetUserGroupByMail")]
        public async Task<ActionResult<bool>>
        CreateUserGroup([FromHeader]string mail, int groupId)
        {
            if (ModelState.IsValid)
            {
                using (var dbContext = new DatabaseContext())
                {
                    User user = dbContext.User.Where(x => x.Email.Equals(mail)).FirstOrDefault();
                    UserGroup userGroup = new UserGroup() { UserId = user.Id, GroupId = groupId};
                    dbContext.UserGroup.Add(userGroup);
                    dbContext.SaveChanges();
                }
            }

            return true;
        }


        //Getting array of ID's of all groups a user is in
        [HttpGet]
        [Route("/GetUserGroupsByUserId")]
        public IEnumerable<int> Get([FromHeader] string token)
        {

            List<int> groups = null;

            using (var dbContext = new DatabaseContext())
            {
                groups = dbContext.UserGroup.Where(x =>x.UserId == GetUserIdFromToken(token)).Select(x=>x.GroupId).ToList();
            }

            return groups;
        }

        //Getting array of ID's of all users in a group
        [HttpGet]
        [Route("/GetUsersByGroupId")]
        public IEnumerable<int> Get(int groupId)
        {

            List<int> groups = null;

            using (var dbContext = new DatabaseContext())
            {
                groups = dbContext.UserGroup.Where(x => x.GroupId == groupId).Select(x => x.UserId).ToList();
            }

            return groups;
        }

        [HttpDelete]
        [Route("/DeleteUserFromGroup")]
        public string DeleteEmploye(int groupId, int userId)
        {
            if (ModelState.IsValid)
            {
                using (var dbContext = new DatabaseContext())
                {
                    dbContext.UserGroup.Remove(dbContext.UserGroup.Where(x => x.UserId == userId).Where(x => x.GroupId == groupId).FirstOrDefault());
                    dbContext.SaveChanges();
                }
            }
            return "Record has successfully Deleted";
        }


        static int GetUserIdFromToken(string token)
        {

            Models.Session session;

            using (var dbContext = new DatabaseContext())
            {
                session = dbContext.Session.Where(x => x.SessionId.Equals(token)).FirstOrDefault();
            }

            if (session.UserId == null)
            {
                return -1;
            }

            return session.UserId;
        }

        public UserGroupController()
		{
		}
	}
}

