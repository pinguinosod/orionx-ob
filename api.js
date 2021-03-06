// requiring the HTTP interfaces in node 
var http = require('http')

var orionx_conn = require('./connection.js')


// create an http server to handle requests and response 
http.createServer(function (req, res) {
    //log the request:
    console.log('New request from: '+req.headers.referer);
    console.log('request url: '+req.url);
    
    // sending a response header of 200 OK 
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    
    var pair = "";
    switch (req.url) {
        case '/ETHBTC':
            pair = "ETHBTC";
        break;
        case '/XRPBTC':
            pair = "XRPBTC";
        break;
        case '/LTCBTC':
            pair = "LTCBTC";
        break;
        case '/CHABTC':
            pair = "CHABTC";
        break;
        case '/LUKBTC':
            pair = "LUKBTC";
        break;
        case '/BCHBTC':
            pair = "BCHBTC";
        break;
        case '/DASHBTC':
            pair = "DASHBTC";
        break;
        default:
            console.log('Pair '+req.url+' not found.')
            res.write(JSON.stringify("-1"), function(err) { res.end() })
        break;
    }
    
    if (pair.length > 3) {
        async function consultaOrionx(pair) {
            try {
                var resultado_final = await orionx_conn.consulta(pair)
                if (resultado_final) {
                    res.write(JSON.stringify(resultado_final), function(err) { res.end() })
                }
                else{
                    console.log('resultado vacio')
                    res.write(JSON.stringify({}), function(err) { res.end() })
                }
                res.end()
            } catch (e) {
                console.log(e);   // uncaught
                res.end()
            }
        }
        
        consultaOrionx(pair)
    }
    
    // use port 8081
}).listen(8081)
console.log('Server running on port 8081.')