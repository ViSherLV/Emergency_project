const Telegraf = require('telegraf');
const bot = new Telegraf("717820910:AAGIJhGcACoi2KhCPTMfZHCgeWAqMLuqeNs");
const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const Scene = require('telegraf/scenes/base');
const stage = new Stage();
const Markup = require('telegraf/markup');
const questionsFinish = new Scene('questionsFinish');
stage.register(questionsFinish);
const keyboards = require("./keyboardsForPatientCard");


const start = new Scene('start');
stage.register(start);



const getPatientName = new Scene('getPatientName');
stage.register(getPatientName);
const confirmPatientName = new Scene("confirmPatientName");
stage.register(confirmPatientName);

const getPatientAge = new Scene("getPatientAge");
stage.register(getPatientAge);
const confirmPatientAge = new Scene("confirmPatientAge");
stage.register(confirmPatientAge);

const getPatientGender = new Scene("getPatientGender");
stage.register(getPatientGender);
const confirmPatientGender = new Scene("confirmPatientGender");
stage.register(confirmPatientGender);


const getPatientWeight = new Scene("getPatientWeight");
stage.register(getPatientWeight);
const confirmPatientWeight = new Scene("confirmPatientWeight");
stage.register(confirmPatientWeight);

const getPatientDiagnosis = new Scene("getPatientDiagnosis");
stage.register(getPatientDiagnosis);
const confirmPatientDiagnosis = new Scene("confirmPatientDiagnosis");
stage.register(confirmPatientDiagnosis);

const getPatientHelp = new Scene("getPatientHelp");
stage.register(getPatientHelp);
const confirmPatientHelp = new Scene("confirmPatientHelp");
stage.register(confirmPatientHelp);

const getPatientResult = new Scene("getPatientResult");
stage.register(getPatientResult);
const confirmPatientResult = new Scene("confirmPatientResult");
stage.register(confirmPatientResult);

const confirmAll = new Scene("confirmAll");
stage.register(confirmAll)

bot.use(session());
bot.use(stage.middleware());

let result = {};

bot.command("start", (ctx,next)=>{
  ctx.reply('Вітаємо вас в формі вводу даних пацієнта, давайте почнемо',keyboards.startKeyboard);

    ctx.scene.enter('start');


});

start.on("text", ctx => {
    if(ctx.message.text=="Розочати заповнення форми"){
    ctx.reply("Вкажіть ім'я і фамілію пацієнта",Markup.removeKeyboard().extra());
    ctx.scene.enter('getPatientName')}
});

getPatientName.on("text", async ctx=>{
    ctx.session.patientName = ctx.message.text;
    await ctx.reply(`Ім'я та фамілія пацієнта  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
    await ctx.scene.enter("confirmPatientName");
})

confirmPatientName.on("text", async (ctx)=>{
    if(ctx.message.text=="Так, все вірно"){
        ctx.reply("Тепер вкажіть вік пацієнта");
        ctx.scene.enter("getPatientAge");
    }else if(ctx.message.text == "Ні, хочу ввести повторно"){

        await ctx.reply("Вкажіть ім'я та фамілію пацієнта");
        await ctx.scene.enter('getPatientName');
    }
});


getPatientAge.on("text", async (ctx)=>{
    ctx.session.patientAge = ctx.message.text;
    await ctx.reply(`Вік пацієнта  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
    await ctx.scene.enter("confirmPatientAge");

});

confirmPatientAge.on("text", async(ctx)=>{
    if(ctx.message.text == "Так, все вірно"){
        await ctx.reply("Тепер вкажіть стать пацієнта",keyboards.getPatientGenderKeyboard);
        await ctx.scene.enter("getPatientGender");
    }else if(ctx.message.text == "Ні, хочу ввести повторно"){
        await ctx.reply("Вкажіть вік пацієнта");
        await ctx.scene.enter("getPatientAge");
    }
});

getPatientGender.on("text", async (ctx)=>{
    ctx.session.patientGender = ctx.message.text;
    await ctx.reply(`Стать пацієнта - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
    await ctx.scene.enter("confirmPatientGender");

});

confirmPatientGender.on("text", async(ctx)=>{
    if(ctx.message.text == "Так, все вірно"){
        await ctx.reply("Тепер вкажіть приблизну вагу пацієнта");
        await ctx.scene.enter("getPatientWeight");
    }else if(ctx.message.text == "Ні, хочу ввести повторно"){
        await ctx.reply("Вкажіть стать пацієнта",keyboards.getPatientGenderKeyboard);
        await ctx.scene.enter("getPatientGender");
    }
});


getPatientWeight.on("text", async (ctx)=>{
    ctx.session.patientWeight = ctx.message.text;
    await ctx.reply(`Вага пацієнта  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
    await ctx.scene.enter("confirmPatientWeight");
})
confirmPatientWeight.on("text", async (ctx)=>{
    if(ctx.message.text == "Так, все вірно"){
        await ctx.reply("Тепер введіть діагноз пацієнта");
        await ctx.scene.enter("getPatientDiagnosis");
    }else if(ctx.message.text == "Ні, хочу ввести повторно"){
        await ctx.reply("Вкажіть вагу пацієнта");
        await ctx.scene.enter("getPatientWeight");
    }
});


getPatientDiagnosis.on("text", async (ctx)=>{
    ctx.session.patientDiagnosis = ctx.message.text;
    await ctx.reply(`Діагноз пацієнта  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
    await ctx.scene.enter("confirmPatientDiagnosis");
})
confirmPatientDiagnosis.on("text", async (ctx)=>{
    if(ctx.message.text == "Так, все вірно"){
        await ctx.reply("Тепер вкажіть надану пацієнту допомогу");
        await ctx.scene.enter("getPatientHelp");

    }else if(ctx.message.text == "Ні, хочу ввести повторно"){
        await ctx.reply("Вкажіть діагноз пацієнта");
        await ctx.scene.enter("getPatientDiagnosis");
    }
});

getPatientHelp.on("text", async (ctx)=>{
    ctx.session.patientHelp = ctx.message.text;
    await ctx.reply(`Надана пацієнтові допомога  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
    await ctx.scene.enter("confirmPatientHelp");
})
confirmPatientHelp.on("text", async (ctx)=>{
    if(ctx.message.text == "Так, все вірно"){
        await ctx.reply("Тепер вкажіть результат наданої допомоги");
        await ctx.scene.enter("getPatientResult");

    }else if(ctx.message.text == "Ні, хочу ввести повторно"){
        await ctx.reply("Вкажіть допомогу надану пацієнту");
        await ctx.scene.enter("getPatientHelp");
    }
});


getPatientResult.on("text", async (ctx)=>{
    ctx.session.patientResult = ctx.message.text;
    await ctx.reply(`Результат наданої допомоги  - ${ctx.message.text}, вірно ?`,keyboards.confirmKeyboard);
    await ctx.scene.enter("confirmPatientResult");
});
confirmPatientResult.on("text", async (ctx)=>{

    if(ctx.message.text == "Так, все вірно"){
        await ctx.reply(`Спасибі, опитування завершено!\nОтримані дані:\nІм'я пацієнта: ${ctx.session.patientName}\nВік пацієнта: ${ctx.session.patientAge}\nСтать пацієнта: ${ctx.session.patientGender}\nВага пацієнта: ${ctx.session.patientWeight}\nДіагноз: ${ctx.session.patientDiagnosis}\nНадана допомога: ${ctx.session.patientHelp}\nРезультат: ${ctx.session.patientResult}\n\nВсе вірно?
                         
         `,keyboards.confirmKeyboard)
        result = {patientName,
                  patientGender,
                  patientWeight,
                  patientDiagnosis,
                  patientHelp,
                  patientHelp,
                  patientResult} = ctx.session;
        console.log(result);
        await ctx.scene.enter("confirmAll");

    }else if(ctx.message.text == "Ні, хочу ввести повторно"){
        await ctx.reply("Вкажіть результат наданої допомоги");
        await ctx.scene.enter("getPatientResult");
    }
});
confirmAll.on("text", async(ctx)=>{
    if(ctx.message.text == "Так, все вірно"){
        await ctx.reply("Дякуємо, дані було відправлено",Markup.removeKeyboard().extra());

        await ctx.scene.leave()
    }else if(ctx.message.text=="Ні, хочу ввести повторно"){
        await ctx.reply("Вкажіть ім'я пацієнта");
        await ctx.scene.enter("getPatientName");
    }
})


bot.launch();