using System;
using System.ComponentModel.DataAnnotations;

namespace ShowCase_Friends_API.Models
{
	public class AfsprakenItem
	{
        [Key]
        public int Id { get; set; }

		public string Title { get; set; }
		public DateTime Date { get; set; }
		public DateTime TimeFrom { get; set; }
		public DateTime TimeTo { get; set; }
		public List<User> PresentUsers { get; set; }

		public AfsprakenItem()
		{
		}
	}
}

