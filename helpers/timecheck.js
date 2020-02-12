



// const timeCheck = (param, req) => {
//     let timeSpent = 0;
//     let timeAllocated = 2;


//     let timeInterval = setInterval(()=> {
//     console.log("started")
//     timeSpent++;
//     if (timeSpent == timeAllocated) {
//         clearInterval(timeInterval);
//         console.log("killed")
//         param.used_referrals.push(req.body.referral)
//         param.save();
//     }
// }, 20000)
    
    
    
// }


const cron = require('node-cron');
const merchants = require('../testdata/testdata')


const timeCheck = (param, req) => {

    let merchant = merchants.merchant1; // Consume/process merchant data received from wicrypt server to find out the merchant through which a user is logged in

    let timeSpent = 0; //Static Value
    let timeAllocated = merchant.limit;

let task = cron.schedule('*/5 * * * * *', () => {

    if(timeSpent == timeAllocated) {
        task.stop();
        console.log("task stopped")
        param.used_referrals.push(req.body.referral)
        param.save();
    } else if(timeSpent < timeAllocated) {
        // task.start();
        console.log("task started")  
        timeSpent++;
    }
   
   }) 
   

}





module.exports = timeCheck;

    
 

   