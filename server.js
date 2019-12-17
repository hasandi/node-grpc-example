var PROTO_PATH = __dirname + '/greet.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var greetpb = grpc.loadPackageDefinition(packageDefinition).greet;

function greet(call, callback) {
    console.log("Greet function invoked with " + call)

    var request = call.request
    var firstName = request.greeting.first_name
    var result = "Hello " + firstName
    var res = {
        result: result
    }

    callback(null, res);
}

function main() {
    var server = new grpc.Server();
    server.addService(greetpb.GreetService.service, { greet: greet });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();