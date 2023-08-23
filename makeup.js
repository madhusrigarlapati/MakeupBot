const request = require('request');

const TelegramBot = require('node-telegram-bot-api');

const token = '5525070300:AAEvzqrh5I7T_KDA-wfLBvCo8EfDTAcnLMk';

const bot = new TelegramBot(token, {polling: true});
let a=0;
bot.onText(/\/start/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "To know the list of products send message \'list\' or name of the makeup product");
    a=1;   
    });
bot.on('message', function(mg){
    request('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline',function(error,response,body){
        
        let da=JSON.parse(body);
        let b=0;
        let l=[];
        for (let i in da){
            l.push(da[i].name)
        }
        if((mg.text).toLowerCase()=='list'){
            b=1;
            bot.sendMessage(mg.chat.id,"The Products Available are:"+l);   
        };
        console.log(mg);
        for (let i in da){
            if((da[i].name).toLowerCase()==(mg.text).toLowerCase()){
                b=b+1;
                a=a+1;
                bot.sendMessage(mg.chat.id,"The Price of the Cosmetic Product :\n "+mg.text+":"+da[i].price);
                bot.sendMessage(mg.chat.id,"The Image of the Cosmetic Product is : "+da[i].image_link);
                bot.sendMessage(mg.chat.id,"Cosmetic Product link to purchase : "+da[i].product_link);
                
                break;
            }
        }
        if(a==0 && b==0){
            bot.sendMessage(mg.chat.id,"Item not Found");
        }
    
    });

})
