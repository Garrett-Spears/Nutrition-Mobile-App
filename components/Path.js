const app_name = 'nutrition-app-27'
exports.buildPath = function buildPath(route)
{
    return 'https://' + app_name +  '.herokuapp.com/' + route;
}