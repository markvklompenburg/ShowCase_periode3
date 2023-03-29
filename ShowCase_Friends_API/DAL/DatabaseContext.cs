using System;
using ShowCase_Friends_API.Models;

using Microsoft.EntityFrameworkCore;

namespace ShowcaseApi.DAL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DatabaseContext()
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<UserGroup> UserGroup { get; set; }
        public DbSet<Session> Session { get; set; }

        ////chat
        //public DbSet<Chat> Chat { get; set; }
        public DbSet<ChatItem> ChatItem { get; set; }

        ////afspraken
        //public DbSet<Afspraken> Afspraken { get; set; }
        //public DbSet<AfsprakenItem> AfsprakenItem { get; set; }

        ////bucketlist
        //public DbSet<Bucketlist> Bucketlist { get; set; }
        //public DbSet<BucketlistItem> BucketlistItem { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=localhost;database=FriendsappDB;uid=root;");
        }
    }
}

