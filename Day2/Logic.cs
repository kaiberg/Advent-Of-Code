using System.Collections.Generic;

namespace Day2
{
    public class Logic
    {
        private Submarine s;

        public void HandleEvents(string[] events)
        {
            foreach (string line in events)
            {
                string[] cmd = line.Split(" ");
                if(int.TryParse(cmd[1], out int value))
                {
                    KeyValuePair<string, int> action = new(cmd[0], value);
                    switch (action.Key)
                    {
                        case "forward":
                            s.MoveHorizontal(action.Value);
                            break;
                        case "backward":
                            s.MoveHorizontal(-action.Value);
                            break;
                        case "up":
                            s.MoveVertical(-action.Value);
                            break;
                        case "down":
                            s.MoveVertical(action.Value);
                            break;
                    }
                }

            }
        }

        public int GetProduct()
        {
            return s.GetProduct();
        }

        public Logic()
        {
            s = new Submarine();
        }
    }
}