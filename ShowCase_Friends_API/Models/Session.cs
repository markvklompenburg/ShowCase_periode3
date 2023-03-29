using System;
using System.ComponentModel.DataAnnotations;

namespace ShowCase_Friends_API.Models
{
	public class Session
	{
		[Key]
		public int Id { get; set; }

		public string SessionId { get; set; }

		public int UserId { get; set; }

		public Session()
		{
		}

		public Session(int userId, string sessionId) {
			this.UserId = userId;
			this.SessionId = sessionId;
		}
	}
}

