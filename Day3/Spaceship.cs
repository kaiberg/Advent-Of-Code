using System;
using System.IO;

namespace MyApp
{
    public class Spaceship
    {
        private int epsilon;
        private int gamma;

        public int getProduct()
        {
            return epsilon * gamma;
        }
        
        public Spaceship(int gamma, int epsilon)
        {
            if ((gamma & epsilon) != 0)
            {
                throw new InvalidDataException();
            }

            this.gamma = gamma;
            this.epsilon = epsilon;
        } 
    }
}