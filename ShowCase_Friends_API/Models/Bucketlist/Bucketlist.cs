using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShowCase_Friends_API.Models
{
    public class Bucketlist
    {
        [Key]
        public int Id { get; set; }

        public List<BucketlistItem> BucketlistItems { get; set; }
 
        public Bucketlist()
		{
		}
	}
}

