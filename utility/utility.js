const moment = require('moment')

function formatMessages(text){
      return {
        text : text,
        time: moment().format('h:mm a'),
      }
};


module.exports =formatMessages