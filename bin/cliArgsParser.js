var optimist =require('optimist');

var parseArgs=function(defaults) {

    var checker=function(options){
    //CONJUDO: check the stuffs
    return true;
    }

    var args=optimist
        .usage('Generate a license\nUsage: $0 [-h]\n$0 [-l]\n$0 [ -o [OWNER] -p [PROJECT] -y [YEAR] ] [license]\n$0 [--config[.key <VALUE>]]\n$0 [--header]')
        .options('h', {
            alias : 'help',
            description : "show this help menu"
        })
        .options('l', {
            alias : 'list',
            description : "list all available license templates"
        })
        .options('o', {
            alias : ['organization'],
            default : defaults.organization,
            description : "the organisation/owner that holds the copy[right,left]"
        })
        .options('p', {
            alias : "project",
            //CONJUDO: nicer way to get current directory
            default : defaults.project,
            description : "the name of the project",
        })
        .options('y', {
            alias : "year",
            default : defaults.year,
            description : "copyright year",
        })
        .options('config', {
            description : "set default values: usage --config.key value\n available:[year], [project], [licenseType], [organisation]",
        })
        .options('header', {
            description : "just get the license header",
        })

        .check(checker)
        .argv
    ;
    //set default licenseType
    if (args._.length==0) {
        args._[0]=defaults.licenseType;
    };

    return args;
}

exports.parseArgs=parseArgs;
exports.optimist=optimist;

