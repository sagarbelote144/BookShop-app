module.exports.cleanUrl = function (breadcrumb) {
    var cleanedUrl = '';
    var items = [];
    if(Number.isInteger(parseInt(breadcrumb[breadcrumb.length - 1].name))){
        breadcrumb.pop();
    }
    for(var i=0; i< breadcrumb.length;i++) {
        var item = breadcrumb[i];
        var url = item.url;
        console.log(item.name);
        if(i === breadcrumb.length-1){
        }
        if(url === 'localhost:3000'){
            cleanedUrl = '/';
        } else {
            cleanedUrl = url.replace('localhost:3000','');
        }
        item.name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        item.url = cleanedUrl;
        items.push(item);
    }
    return items;
};