using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExampleApi.Models;
using System.Collections.Concurrent;

namespace ExampleApi.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private ConcurrentDictionary<Guid, Person> people = new ConcurrentDictionary<Guid, Person>();

        public PersonRepository()
        {
            //Add a couple people so there is something interesting.
            Add(new Person()
            {
                Name = "Ivan",
                Surname = "Otokar"
            });

            Add(new Person()
            {
                Name = "Gregg",
                Surname = "Tristan"
            });

            Add(new Person()
            {
                Name = "Elmo",
                Surname = "Driskoll"
            });
        }

        public void Add(Person person)
        {
            person.Id = Guid.NewGuid();
            people.GetOrAdd(person.Id, person);
        }

        public Person Get(Guid id)
        {
            Person ret;
            people.TryGetValue(id, out ret);
            return ret;
        }

        public IEnumerable<Person> List()
        {
            return people.Values;
        }

        public void Remove(Guid id)
        {
            Person ret;
            people.TryRemove(id, out ret);
        }

        public void Remove(Person person)
        {
            Person ret;
            people.TryRemove(person.Id, out ret);
        }

        public void Update(Person person)
        {
            people.AddOrUpdate(person.Id, person, (a, b) =>
            {
                return person;
            });
        }
    }
}
