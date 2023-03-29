//using System;
//using Microsoft.AspNetCore.Mvc;
//using ShowCase_Friends_API.Models;
//using ShowcaseApi.DAL;

//namespace ShowCase_Friends_API.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class BucketlistController : ControllerBase
//	{
//        [HttpGet]
//        [Route("/GetBucketlist")]
//        public IEnumerable<Bucketlist> Get()
//        {

//            List<Bucketlist> bucketlists = null;

//            using (var dbContext = new DatabaseContext())
//            {
//                bucketlists = dbContext.Bucketlist.ToList();
//            }

//            return bucketlists.ToArray();
//        }

//        [HttpPost]
//        [Route("/SetBucketlist")]
//        public async Task<ActionResult<Bucketlist>>
//        CreateBucketlist([FromBody] Bucketlist bucketlist)
//        {
//            if (ModelState.IsValid)
//            {
//                using (var dbContext = new DatabaseContext())
//                {
//                    dbContext.Bucketlist.Add(bucketlist);
//                    dbContext.SaveChanges();
//                }
//            }

//            return bucketlist;
//        }
//    }
//}

