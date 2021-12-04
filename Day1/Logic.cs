using System.Collections.Generic;

namespace MyApp
{
    public class Logic
    {
        public static int CountSingleIncreases(List<int> changeLog) // log is the log of depths changes
        {
            int ans = 0; // n of depth increases
            for (int i = 1; i < changeLog.Count; i++)
            {
                if (changeLog[i] > changeLog[i - 1])
                    ans++;
            }
            
            return ans;
        }
        
        public static int CountSlidingIncreases(List<int> changeLog) // log is the log of depths changes
        {
            int ans = 0; // n of depth increases
            for (int i = 1; i < changeLog.Count-2; i++)
            {
                int prev = changeLog[i-1]+changeLog[i]+changeLog[i+1];
                int curr = changeLog[i]+changeLog[i+1]+changeLog[i+2];

                if (curr > prev)
                    ans++;
            }
            
            return ans;
        }
    }
}