namespace Day2
{
    public class Submarine
    {
        private int verticalPosition;
        private int horizontalPosition;

        public void MoveHorizontal(int amount)
        {
            horizontalPosition += amount;
        }

        public void MoveVertical(int amount)
        {
            verticalPosition += amount;
        }

        public int GetProduct()
        {
            return verticalPosition * horizontalPosition;
        }

        public Submarine(int verticalPosition = 0, int horizontalPosition = 0)
        {
            this.verticalPosition = verticalPosition;
            this.horizontalPosition = horizontalPosition;
        }
    }
}