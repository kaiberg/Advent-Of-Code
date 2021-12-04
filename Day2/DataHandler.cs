using System.Collections.Generic;
using System.IO;

namespace Day2
{
    public class DataHandler
    {
        public string FileName {
            get;
            set;
        }

        public override string ToString()
        {
            StreamReader sr = new StreamReader(FileName);
            return sr.ReadToEnd();
        }

        public string[] ToArr()
        {
            string fileText = ToString();
            return fileText.Split("\r\n");
        }
    }
}