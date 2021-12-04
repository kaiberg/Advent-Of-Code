using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;


namespace Day2 // Note: actual namespace depends on the project name.
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string _filePath = Path.GetDirectoryName(System.AppDomain.CurrentDomain.BaseDirectory);
            DataHandler datahandler = new()
            {
                FileName = "../../../Input.txt"
            };

            Logic logic = new();
            logic.HandleEvents(datahandler.ToArr());
            int ansP1 = logic.GetProduct();

            LogicPart2 logicPart2 = new();
            logicPart2.HandleEvents(datahandler.ToArr());
            int ansP2 = logicPart2.GetProduct();

            Console.WriteLine("### Solution Part 1:");
            Console.WriteLine(ansP1);
            
            Console.WriteLine("### Solution Part 2:");
            Console.WriteLine(ansP2);
        }
    }
}