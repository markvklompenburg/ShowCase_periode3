using System;
using System.ComponentModel.DataAnnotations;

namespace ShowCase_Friends_API.Models
{
	public class User
	{
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string ProfilePicture { get; set; }

        public User()
		{
		}
	}
}

