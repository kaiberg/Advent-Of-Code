using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace MyApp
{
    public class Datahandler
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

        public List<int> GetAllInts()
        {
            string[] lines = ToArr(); 
            List<int> o = new(); // output
            
            foreach (string line in lines)
            {
                if (int.TryParse(line, out int num))
                    o.Add(num);
            }

            return o.Count > 0 ? o : null;
        }
    }
}