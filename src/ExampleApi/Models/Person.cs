using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace ExampleApi.Models
{
    public class Person
    {
        public Person()
        {

        }

        [DisplayName("Id")]
        [ReadOnly(true)]
        public Guid Id { get; set; }

        [DisplayName("First Name")]
        public String Name { get; set; }

        [DisplayName("Last Name")]
        public String Surname { get; set; }
    }
}
