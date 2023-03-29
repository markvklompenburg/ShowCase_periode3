using System;
using System.ComponentModel.DataAnnotations;

namespace ShowCase_Friends_API.Models
{
	public class UserGroup
	{
		[Key]
		public int Id { get; set; }

		public int UserId { get; set; }
		public int GroupId { get; set; }

		public UserGroup()
		{
		}
	}
}

