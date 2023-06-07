const Service = require('node-windows').Service

const svc = new Service({
    name: "Node_SMTP_PROXY",
    description: "proxy for email sent to the smtp server",
    script:  "C:\\inetpub\\wwwroot\\NodeSmtpAPI\\index.js"
})


svc.on('install', function(){
    svc.start()
}).on('error', (err) => {
    console.error(err + year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
  });

svc.install()

