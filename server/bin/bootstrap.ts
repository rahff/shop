
import app from '../app';

import http from 'http';
import { CartModule } from '../modules/CartModule';
import { InvoiceModule } from '../modules/InvoiceModule';
import { ProductModule } from '../modules/ProductModule';
import { HttpModule } from '../modules/HttpModule';



const port = process.env.PORT || 3000
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    
    default:
      throw error;
  }
}


function onListening() {
  console.log("listen on " + port);
  
 
}
