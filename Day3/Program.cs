using System;
using System.Collections.Generic;
using System.Linq;

namespace MyApp // Note: actual namespace depends on the project name.
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Datahandler datahandler = new Datahandler()
            {
                FileName = "../../../Input.txt"
            };

            int gamma = Logic.BinaryToInt(Logic.MostCommonBinaryChar(datahandler.toArr()));
            int epsilon = Logic.BinaryToInt(Logic.LeastCommonBinaryChar(datahandler.toArr()));

            Spaceship s = new(gamma, epsilon);
            
            Console.WriteLine(s.getProduct());
               
        }
    }
}