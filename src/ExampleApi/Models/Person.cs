using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExampleApi.Models
{
    public class Person
    {
        public Person()
        {

        }

        public Guid Id { get; set; }

        public String Name { get; set; }

        public String Surname { get; set; }
    }
}
