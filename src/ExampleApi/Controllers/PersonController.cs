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

        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return personRepo.List();
        }

        [HttpGet("{id}")]
        public Person Get(Guid id)
        {
            return personRepo.Get(id);
        }

        [HttpPost]
        [AutoValidate]
        public void Post([FromBody]Person value)
        {
            personRepo.Add(value);
        }

        [HttpPut("{id}")]
        [AutoValidate]
        public void Put(Guid id, [FromBody]Person value)
        {
            value.Id = id;
            personRepo.Update(value);
        }

        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            personRepo.Remove(id);
        }
    }
}
