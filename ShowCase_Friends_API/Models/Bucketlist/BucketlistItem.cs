using System;
using System.ComponentModel.DataAnnotations;

namespace ShowCase_Friends_API.Models
{
    public class BucketlistItem
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public bool Status { get; set; } = false;

        public BucketlistItem()
		{
		}
    }
}

