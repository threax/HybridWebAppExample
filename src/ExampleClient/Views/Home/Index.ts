import * as personService from 'clientlibs.PersonService';
import { CrudPage } from 'hr.widgets.crudpage';
import * as controller from 'hr.controller';
import { BrowserConfirm } from 'hr.widgets.confirm';
import { BrowserPrompt } from 'hr.widgets.prompt';
import * as http from 'hr.http';

//Create a person service from our api, TODO: find a way to configure the urls better.

personService.create("http://localhost:64700/swagger/v1/swagger.json", "http://localhost:64700/api/Person")
    .then(function (service) {
        var prompt = new BrowserPrompt();

        //Use the generic crud page from htmlrapier.widgets, this page can be very simple by just
        //doing what is under Simple config, but you can further cusomize the actions on both the
        //whole page controller and the individual list item controllers.
        //TODO: add paging and search support to the crud page
        var crudPageSettings = {
            //Simple config
            schema: service.getSchema(),
            create: (data) => service.create(data),
            list: () => service.list(),
            update: (data) => service.update(data),
            del: (data) => service.delete(data),
            listController: "mainTable",
            itemEditorController: "entryEditor",
            deletePrompt: new BrowserConfirm(),
            itemNameProperty: "name",

            //Advanced config
            listingActions: {
                //copy: function (item) {
                //    //Using json anyway
                //    var copy = JSON.parse(JSON.stringify(item));
                //    copy.id = 0;
                //    return crudPage.edit(copy, crudPageSettings.create);
                //}
            },
            pageActions: {
                //addMetadata: function (data) {
                //    var result = prompt.prompt("Enter the metadata address", "/Metadata/Scope")
                //        .then(function (metadataUrl) {
                //            if (metadataUrl.isAccepted()) {
                //                http.get(metadataUrl.getData())
                //                    .then(function (data: any) {
                //                        if (data !== null) {
                //                            data.id = 0;
                //                            return crudPage.edit(data, crudPageSettings.create);
                //                        }
                //                        else {
                //                            alert(metadataUrl.getData() + ' does not have any client info published.');
                //                        }
                //                    })
                //                    .catch(function (err) {
                //                        alert('Could not read metadata at ' + metadataUrl.getData());
                //                    });
                //            }
                //        });
                //}
            }
        };

        var crudPage = new CrudPage(crudPageSettings);
        crudPage.refreshData();
    });

