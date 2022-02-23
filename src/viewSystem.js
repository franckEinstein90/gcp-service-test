/*******************************************************************************
 *  viewSystem.js
 *
 *  sets up the handlebar view system
 ******************************************************************************/

import {engine} from 'express-handlebars'; 
 
export const viewSystem = ({app,rootPath}) => {
    app.engine('handlebars', engine({
        defaultLayout:'main', 
        layoutsDir: rootPath + '/views/layouts', 
        partialsDir: rootPath + '/views/partials'
    })); 
    app.set('view engine', 'handlebars');
}
    /*   return{
 
     configure: function({app, root}){
 
       app.engine('hbs', engine({
         extname: 'hbs', 
         defaultLayout: 'main', 
         layoutsDir: root + '/views/layouts/', 
         partialsDir: root + '/views/partials/'
       }))
       app.set('view engine', 'handlebars');
 
     }
   }
}(); */

 
