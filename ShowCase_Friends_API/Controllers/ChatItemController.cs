using System;
using Microsoft.AspNetCore.Mvc;
using ShowCase_Friends_API.Models;
using ShowcaseApi.DAL;

namespace ShowCase_Friends_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatItemController : ControllerBase
	{

        [HttpGet]
        [Route("/GetChatItem")]
        public IEnumerable<ChatItem> Get()
        {

            List<ChatItem> chatItems = null;

            using (var dbContext = new DatabaseContext())
            {
                chatItems = dbContext.ChatItem.ToList();
            }

            return chatItems;
        }

        [HttpGet]
        [Route("/GetChatItemByGroupId")]
        public IEnumerable<ChatItem> Get(int id)
        {

            List<ChatItem> chatItems = null;

            using (var dbContext = new DatabaseContext())
            {
                chatItems = dbContext.ChatItem.ToList();
            }

            return chatItems.Where(x => x.GroupId.Equals(id)).ToArray();
        }

        [HttpPost]
        [Route("/SetChatItem")]
        public async Task<ActionResult<ChatItem>>
        CreateUser([FromBody] ChatItem chatItem)
        {
            if (ModelState.IsValid)
            {
                using (var dbContext = new DatabaseContext())
                {
                    chatItem.SendTime = DateTime.Now;
                    dbContext.ChatItem.Add(chatItem);
                    dbContext.SaveChanges();
                }
            }

            return chatItem;
        }
    }
}

