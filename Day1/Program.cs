using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;


namespace MyApp // Note: actual namespace depends on the project name.
{
    public class Program
    {

        public static void Main(string[] args)
        {
            string _filePath = Path.GetDirectoryName(System.AppDomain.CurrentDomain.BaseDirectory);
            Datahandler datahandler = new()
            {
                FileName = "../../../Input.txt"
            };
        
            int ansP1 = Logic.CountSingleIncreases(datahandler.GetAllInts());
            int ansP2 = Logic.CountSlidingIncreases(datahandler.GetAllInts());  
            
            Console.WriteLine("### Solution Part 1:");
            Console.WriteLine(ansP1);
            
            Console.WriteLine("### Solution Part 2:");
            Console.WriteLine(ansP2);
            
            
        }
    }
}