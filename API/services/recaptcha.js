const keys = require('../config/keys');
var rp = require('request-promise');


exports.validateRecaptcha = (recaptcha, requestIP) => {
    return new Promise((resolve, reject) => {
        if(recaptcha === undefined || recaptcha === '' || recaptcha === null) {
            reject({error:  "Missing captcha"});
        }else{
            var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + keys.googleRecaptchaSecret 
            + "&response=" + recaptcha + "&remoteip=" + requestIP;
            
            rp(verificationUrl).then((body) => {
                body = JSON.parse(body);
                
                if(body.success !== undefined && !body.success) {
                    reject({error : "Failed captcha verification"});
                }
                if(body.success !== undefined && body.success ){
                    resolve(true);
                }
            })
            .catch(function(err){
                reject({error : "Captcha failed to connect"});
            });
        }
});
}