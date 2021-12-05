using System.IO;

namespace MyApp
{
    public class Datahandler
    {
        public string FileName { get; set; }

        public string[] toArr()
        {
            StreamReader sr = new(FileName);
            return sr.ReadToEnd().Split("\r\n");
        }
    }
}