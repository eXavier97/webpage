var https = require("https");
var fs = require("fs");

function generateInvoice(invoice, filename, success, error) {
  var postData = JSON.stringify(invoice);
  var options = {
    hostname: "invoice-generator.com",
    port: 443,
    path: "/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData)
    }
  };

  var file = fs.createWriteStream('../' + filename);

  var req = https.request(options, function(res) {
    res
      .on("data", function(chunk) {
        file.write(chunk);
      })
      .on("end", function() {
        file.end();

        if (typeof success === "function") {
          success();
        }
      });
  });
  req.write(postData);
  req.end();

  if (typeof error === "function") {
    req.on("error", error);
  }
}

module.exports.generar = generateInvoice;