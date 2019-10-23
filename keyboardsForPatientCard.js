const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');

const startKeyboard = Markup
    .keyboard(['Розочати заповнення форми'])
    .oneTime()
    .resize()
    .extra();

const confirmKeyboard = Markup
    .keyboard([
        ["Так, все вірно"],["Ні, хочу ввести повторно"],

        ])
    .oneTime()
    .resize()
    .extra();

const getPatientGenderKeyboard = Markup
    .keyboard(["Чоловіча","Жіноча"])
    .oneTime()
    .resize()
    .extra();

module.exports = {
    confirmKeyboard:confirmKeyboard,
    getPatientGenderKeyboard:getPatientGenderKeyboard,
    startKeyboard:startKeyboard
}