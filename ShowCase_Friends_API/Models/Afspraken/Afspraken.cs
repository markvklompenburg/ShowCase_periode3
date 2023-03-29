using System;
using System.ComponentModel.DataAnnotations;

namespace ShowCase_Friends_API.Models
{
	public class Afspraken
	{
        [Key]
        public int Id { get; set; }
		public List<AfsprakenItem> AfsprakenItems { get; set; }


        public Afspraken()
		{
		}
	}
}

