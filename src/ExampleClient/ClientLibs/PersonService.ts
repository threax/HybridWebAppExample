/*
This file shows how to create a service for the Hybrid app architecture. A service should deal with
the controller more directly, sending http requests and stuff, this way it can be kept out of the individual
view scripts.

Note: This is currently using SwaggerClient from swagger-js (https://github.com/swagger-api/swagger-js), however,
this library is kind of big, has a lot of errors when it runs and doesn't even work to actully send results back
to the server. Its also so dynamic you don't get any intellisense since it generates everything at runtime.
Because of this I would like to eventually get rid of it and just use gulp to generate the json
schemas from the swagger.json file during build. These schemas can be added as modules and then returned from the
service. We also don't have to publish the swagger docs in production this way.

Until this is done, make your services as below, get a swagger client, but only use it to return the schema, otherwise
use hr.http directly to do your post put etc. There will be instructions on how to convert your services when the
changes are made.
*/

import { SwaggerClient } from 'swaggerapi.swaggerclient';
import * as http from 'hr.http';
import { EventHandler } from 'hr.eventhandler';

export function create(swaggerUrl?: string, clientUrl?: string): Promise<PersonService> {
    if (swaggerUrl === undefined) {
        swaggerUrl = "/swagger/v1/swagger.json";
    }

    if (clientUrl === undefined) {
        clientUrl = "/api/Client";
    }

    //This is how we get a swagger client. The way they did this is insane
    //since you use a promise in the constructor, but just copy this and
    //it should work.
    return Promise.resolve<SwaggerClient>(new SwaggerClient({
        url: swaggerUrl,
        usePromise: true
    }))
    .then(function (data) {
        return new PersonService(clientUrl, data);
    });
}

/**
 * A service to talk to the person controller
 * @param {string} clientUrl
 * @param {SwaggerClient} swg
 * @returns
 */
export class PersonService {
    private url: string;
    private swg: SwaggerClient;

    /**
     * Constructor
     * @param {string} url The url of the Person controller
     * @param {SwaggerClient} swg The swagger client (this method wil be deprecated).
     */
    constructor(url: string, swg: SwaggerClient) {
        this.url = url;
        this.swg = swg;
    }

    /**
     * Get a list of all the people.
     * @returns
     */
    list() {
        return http.get(this.url);
    }

    /**
     * Create a new person
     * @param data The person to create on the server.
     * @returns A promise that will resolve when the operation is complete.
     */
    create(data): Promise<any> {
        return http.post(this.url, data);
    }

    /**
     * Update a person
     * @param data The person to update
     * @returns A promise that will resolve when the operation is complete.
     */
    update(data): Promise<any> {
        return http.put(this.url + '/' + data.id, data);
    };

    /**
     * Delete a person.
     * @param data The person to delete.
     * @returns A promise that will resolve when the operation is complete.
     */
    delete(data): Promise<any> {
        return http.del(this.url + '/' + data.id);
    };

    /**
     * Get the schema for the model used by this service.
     * @returns A json schema object that defines the model.
     */
    getSchema(): any {
        //Here is the only place we use the swagger generated code,
        //this will be replaced 
        return this.swg.models.Person.definition;
    }
}