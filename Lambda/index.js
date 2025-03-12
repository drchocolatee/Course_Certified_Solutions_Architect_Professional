const { SES } = require("@aws-sdk/client-ses");
const { SNS } = require("@aws-sdk/client-sns");

const sns = new SNS({
   region:'us-east-1'
});
var ses = new SES({
   region: 'us-east-1'
});
exports.handler = function(event, context, callback) {
   console.log("AWS lambda and SNS trigger ");
   console.log(event);
   const s3message = "Bucket Name:"+event.Records[0].s3.bucket.name+"\nLog details:"+event.Records[0].s3.object.key;
   console.log(s3message);
   var eParams = {
      Destination: {
         ToAddresses: ["achidubema@gmail.com", "onyibe@gmail.com", "freddyibe05@gmail.com"]
      },
      Message: {
         Body: {
            Text: {
               Data: `Fuck u Mouctar, you thought I ran out of time huh?\n\n${s3message}`
            }
         },
         Subject: {
            Data: "cloudtrail logs, fuck u mouctar"
         }
      },
      Source: "achidubema@gmail.com"
   };
   var email = ses.sendEmail(eParams, function(err, data) {
      if (err) console.log(err);
      else {
         console.log("===EMAIL SENT===");
         console.log("EMAIL CODE END");
         console.log('EMAIL: ', email);
         context.succeed(event);
         callback(null, "email is send");
      }
   });
};