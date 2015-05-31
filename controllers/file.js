var fs = require("fs"),
    url = require("url"),
    path = require("path");

module.exports=function(next){
    var fileName=this.params.name;
    var file = path.resolve(__dirname,fileName);
    var range = req.headers.range;
    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);

    fs.stat(file, function(err, stats) {
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
    yield next;
}
