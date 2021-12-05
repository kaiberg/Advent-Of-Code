using System;
using System.Collections.Generic;
using System.Linq;

namespace MyApp
{
    public class Logic
    {
        public static string MostCommonBinaryChar(string[] strings)
        {
            string output = "";
            for (int i = 0; i < strings[0].Length; i++)
            {
                int diff = 0;
                for (int j = 0; j < strings.Length; j++)
                {
                    if (strings[j][i] - '0' == 0)
                        diff--;
                    else
                        diff++;
                }
                output = (diff > 0) ? output += "1" : output += "0";
            }
            return output;
        }
        
        public static string LeastCommonBinaryChar(string[] strings)
        {
            string output = "";
            string mostCommon = MostCommonBinaryChar(strings);

            foreach (char c in mostCommon)
            {
                output += (c == '0') ? "1" : "0";
            }
            return output;
        }
        
        public static int BinaryToInt(string binaryNumber)
        {
            return Convert.ToInt32(binaryNumber, 2);
        }
    }
}