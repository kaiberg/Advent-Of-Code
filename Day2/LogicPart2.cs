using System.Collections.Generic;

namespace Day2
{
    public class LogicPart2
    {
        private SubmarinePart2 s;

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
                            s.MoveVertical(s.GetAim()*action.Value);
                            break;
                        case "up":
                            s.MoveAim(-action.Value);
                            break;
                        case "down":
                            s.MoveAim(action.Value);
                            break;
                    }
                }

            }
        }

        public int GetProduct()
        {
            return s.GetProduct();
        }

        public LogicPart2()
        {
            s = new();
        }
    }
}