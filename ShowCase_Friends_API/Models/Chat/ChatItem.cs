using System;
using System.ComponentModel.DataAnnotations;

namespace ShowCase_Friends_API.Models
{
	public class ChatItem
	{
        [Key]
        public int Id { get; set; }
        public string Message { get; set; }
		public DateTime SendTime { get; set; }
        public int SenderId { get; set; }
        public int GroupId { get; set; }

        public ChatItem()
		{
		}
	}
}

