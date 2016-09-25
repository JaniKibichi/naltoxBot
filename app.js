'use strict';

/* declare the constants */

const Telegram = require('telegram-node-bot');
const TelegramBaseController = Telegram.TelegramBaseController;
const TelegramBaseCallbackQueryController = Telegram.TelegramBaseCallbackQueryController;
const TelegramBaseInlineQueryController = Telegram.TelegramBaseInlineQueryController;
const tg = new Telegram.Telegram('Your_Token');

/* create messaging class */
class PingController extends TelegramBaseController {
	/**
	* @param {Scope} $
	*/
	pingHandler($){
		$.sendMessage('pong')
	}

	get routes(){
		return {
			'ping': 'pingHandler'
		}
	}
}

class OtherwiseController extends TelegramBaseController{
    handle($) {
    	$.sendPhoto({ path: 'path/to/file'})
    }
}

class SumController extends TelegramBaseController{
	/**
	*@param {Scope} $
	*/
	sumHandler($){
		$.sendMessage(parseInt($.query.num1) + parseInt($.query.num2));
	}

	get routes(){
		return {
			'sum': 'sumHandler'
		}		
	}
}

class InlineModeController extends TelegramBaseInlineQueryController {
	handle(){

	}
}

class CallbackQueryController extends TelegramBaseCallbackQueryController {
	handle(){

	}
}

class FormController extends TelegramBaseController {
/* create forms */
const form = {
	name: {
		q: 'send me your name',
		error: 'Sorry, wrong input',
		validator: (message, callback) => {
			if(message.text){
				callback(true, message.text); //you must pass the result also
				return;
			}
			callback(false);
		}
	},

	age: {
		q: 'Send me your age',
		error: 'Sorry, wrong input',
		validator: (message, callback) => {
			if(message.text && IsNumeric(message.text)){
				callback(true, toInt(message.text));
				return;
			}
			callback(false);
		}
	}
}

	/**
	* @param {scope} $
	*/
	formHandler($){
		$.runForm(form, (result) => { console.log(result); });
	}

		get routes(){
			return{
				'form': 'formHandler'
			}
		}

}

/* creating menus */
$.runMenu({
	message: 'Select',
	layout: 2,
	'test1':() => {}, /* layout is on 1st line */
	'test2':() => {}, /* layout is on 1st line */
	'test3':() => {}, /* layout is on 2nd line */
	'test4':() => {}, /* layout is on 2nd line */
	'test5':() => {}  /* layout is on 3rd line */
})

$.runMenu({
	message: 'Select',
	layout: [1,2,1,1]
	'test1':() => {}, /* layout is on 1st line */
	'test2':() => {}, /* layout is on 2nd line */
	'test3':() => {}, /* layout is on 2nd line */
	'test4':() => {}, /* layout is on 3rd line */
	'test5':() => {}  /* layout is on 4th line */
})

/* create Inline Menu */
$.runInlineMenu({
	layout: 2,
	method: 'sendMessage',
	params: ['text'],
	menu: [
		{
			text: '1',
			callback: (callbackQuery, message) => {
				console.log(1);
			}
		},
		{
			text: 'Exit',
			message: 'Are you sure?',
			layout: 2,
			menu:[ //create a sub menu
			   {
			   	 text: 'Yes!',
			   	 callback: () => {

			   	 }
			   },
			   {
			   	text: 'No!',
			   	callback: () =>{
			   		
			   	}
			   }
			]
		}
	]
})




tg.router
    .when(['ping'], new PingController())
    .when('/start', new StartController())
    .when('/stop', new StopController())
    .when('/restart', new RestartController())
    .when('/sum :num1 :num2', new SumController())
    .when('/form', new FormController())
    .inlineQuery(new InlineModeController())
    .callbackQuery(new CallbackQueryController())
    .otherwise(new OtherwiseController());