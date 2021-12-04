namespace Day2
{
    public class SubmarinePart2
    {
        private int verticalPosition;
        private int horizontalPosition;
        private int aim;

        public void MoveHorizontal(int amount)
        {
            horizontalPosition += amount;
        }

        public void MoveVertical(int amount)
        {
            verticalPosition += amount;
        }

        public void MoveAim(int amount)
        {
            aim += amount;
        }

        public int GetProduct()
        {
            return verticalPosition * horizontalPosition;
        }

        public int GetAim()
        {
            return aim;
        }

        public SubmarinePart2(int verticalPosition = 0, int horizontalPosition = 0)
        {
            this.verticalPosition = verticalPosition;
            this.horizontalPosition = horizontalPosition;
            this.aim = aim;
        }
    }
}