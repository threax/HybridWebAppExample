using ExampleApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExampleApi.Repository
{
    public interface IPersonRepository
    {
        IEnumerable<Person> List();

        Person Get(Guid id);

        void Add(Person person);

        void Update(Person person);

        void Remove(Person person);

        void Remove(Guid id);
    }
}
