using System;
using System.Web.Http.ModelBinding;
using Microsoft.AspNetCore.Mvc;
using ShowcaseApi.DAL;
using ShowCase_Friends_API.Models;

namespace ShowCase_Friends_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VriendengroepController : ControllerBase
    {

        [HttpGet]
        [Route("/GetVriendengroep")]
        public IEnumerable<Group> Get()
        {

            List<Group> vriendengroep = null;

            using (var dbContext = new DatabaseContext())
            {
                vriendengroep = dbContext.Group.ToList();
            }

            return vriendengroep.ToArray();
        }

        [HttpGet]
        [Route("/GetVriendengroepByID")]
        public IEnumerable<Group> Get(int id)
        {

            List<Group> vriendengroep = null;

            using (var dbContext = new DatabaseContext())
            {
                vriendengroep = dbContext.Group.ToList();
            }

            return vriendengroep.Where(x =>x.Id.Equals(id)).ToArray();
        }

        [HttpPost]
        [Route("/SetVriendengroep")]
        public async Task<ActionResult<Group>>
        CreateVriendengroep([FromBody] Group group)
        {
            if (ModelState.IsValid)
            {
                using (var dbContext = new DatabaseContext())
                {
                    dbContext.Group.Add(group);
                    dbContext.SaveChanges();
                }
            }

            return group;
        }

    }
}

