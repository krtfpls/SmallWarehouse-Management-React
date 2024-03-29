using System;

namespace Model
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; } = DateTime.UtcNow.AddDays(1);
        public bool IsExpired => DateTime.UtcNow >= Expires;
        public DateTime? Revoked {get; set;}
        public bool IsActive => Revoked == null & !IsExpired;

    }
}