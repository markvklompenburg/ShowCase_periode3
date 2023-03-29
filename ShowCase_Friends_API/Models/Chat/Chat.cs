using System;
using System.ComponentModel.DataAnnotations;

namespace ShowCase_Friends_API.Models
{
	public class Chat
	{
		[Key]
		public int Id { get; set; }
		public List<ChatItem> ChatItems { get; set; }

        public Chat()
		{
		}
	}
}

