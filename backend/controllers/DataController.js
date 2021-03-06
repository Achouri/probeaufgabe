const {getInstance} = require('xpresser');
const $ = getInstance();

/**
 * DataController
 */
const DataController = {
    // Controller Name
    name: "DataController",
    // Controller Middlewares
    middlewares: {},
    
    // Controller Default Service Error Handler.
    e: (http, error) => http.toApiFalse({error}),


    /**
     * Returns all configurations needed for frontend
     * @param {Xpresser.Http} http
     * @returns {*}
     */
    config(http){
        let auth = $.config.get('auth.enabled', false);

        // if auth is enabled get auth config needed by frontend
        if (auth) {
            auth = $.config.path('auth').pick([
                'enabled'
            ])

            // check if app has any user registered in db..
            const users = $.db.get(['users']).value();
            auth.hasUsers = !!(users && users.length);
        }


        return http.toApi({
            config: {
                auth
            }
        })
    },
};


module.exports = DataController;
