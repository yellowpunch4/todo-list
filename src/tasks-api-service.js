import ApiService from './framework/view/api-service.js';


const Method = {
 GET: 'GET',
 PUT: 'PUT',
 POST: 'POST',
 DELETE: 'DELETE',
};


export default class TasksApiService extends ApiService {
    get tasks() {
        return this._load({url: 'tasks'})
          .then(ApiService.parseResponse);
      }
     
     
     }
     