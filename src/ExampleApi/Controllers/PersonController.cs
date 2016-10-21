using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExampleApi.Models;
using ExampleApi.Repository;

namespace ExampleApi.Controllers
{
    [Route("api/[controller]")]
    public class PersonController : Controller
    {
        IPersonRepository personRepo;

        public PersonController(IPersonRepository personRepo)
        {
            this.personRepo = personRepo;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return personRepo.List();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Person Get(Guid id)
        {
            return personRepo.Get(id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Person value)
        {
            personRepo.Add(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put([FromBody]Person value)
        {
            personRepo.Update(value);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            personRepo.Remove(id);
        }
    }
}
