'use strict';

/**
 * Телефонная книга
 */
const phoneBook = new Map();
const phoneBookInstance = new PhoneBook()
const parser = new Parser(phoneBookInstance);

const commands = [
  'Создай',
  'Удали',
  'Добавь',
  'Покажи',
]
const commandsRegExps = {

  matchCreateContact: RegExp(/^Создай контакт\s/),
  matchDeleteContact: RegExp(/^Удали контакт\s/),
  matchAddProperty: RegExp(/^Добавь\s/),
  matchDeleteProperty: RegExp(/^Удали\s/),
  matchShow: RegExp(/^Покажи\s/),

  CreateContact: RegExp(/^Создай контакт \S+$/),
  DeleteContact: RegExp(/^Удали контакт \S+$/),
  AddProperty: RegExp(/^Добавь .+ для контакта \S+$/),

  phoneNumber: RegExp(/^\d{10}$/),
}

/**
 * Вызывайте эту функцию, если есть синтаксическая ошибка в запросе
 * @param {number} lineNumber – номер строки с ошибкой
 * @param {number} charNumber – номер символа, с которого запрос стал ошибочным
 */
function syntaxError(lineNumber, charNumber) {
  throw new Error(`SyntaxError: Unexpected token at ${lineNumber}:${charNumber}`);
}

function PhoneBook() {

  this.createContact = function (contactName) {
    console.info(`Попытка создать контакт ${contactName}`);
    if (!phoneBook.has(contactName)) {
      phoneBook.set(contactName, {tels: [], mails: []});
    }
    return {'ok': -1};
  }

  this.deleteContact = function (contactName) {
    phoneBook.delete(contactName);
    return {'ok': -1};
  }

  this.addTel = function (tel, contactName) {
    if (!phoneBook[contactName].tels.includes(tel)) {
      phoneBook[contactName].tels.push(tel);
    }
  }

  this.addMail = function (mail, contactName) {
    if (!phoneBook[contactName].mails.includes(mail)) {
      phoneBook[contactName].mails.push(mail);
    }
  }

  this.add = function (argument, contactName) {
    if (!phoneBook.has(contactName)) return;

    let parseArgument = argument.split('и').map(item => item.trim());

    for (let i = 0; i < parseArgument.length; i++) {

    }
    //if (!phoneBook[contactName].)
  }
}

function Parser() {
  this.createContact = function (command) {
    let splitCommand = command.split(' ');
    if (commandsRegExps.CreateContact.test(command)) {
      return phoneBookInstance.createContact(splitCommand[2]);
    }
    else {
      if (splitCommand.length > 3)
        return {'error': (16 + splitCommand[2].length)};
      if (splitCommand[2] === '')
        return {'error': 16};
    }
  }
  this.deleteContact = function (command) {
    let splitCommand = command.split(' ');
    if (commandsRegExps.DeleteContact.test(command)) {
      return phoneBookInstance.deleteContact(splitCommand[2]);
    }
    else {
      if (splitCommand.length > 3)
        return {'error': (16 + splitCommand[2].length)};
      if (splitCommand[2] === '')
        return {'error': 16};
    }
  }
  this.addProperty = function (command) {
    if(commandsRegExps.AddProperty.test(command)) {
      let toAdd = {tels:[],mails:[]};
      // Добавь * * для контакта *;
      let splitCommand = command.split(' ');
      let i = 1;
      while (splitCommand[i] !== 'для') {
        if (splitCommand[i] === 'телефон'){
          if(commandsRegExps.phoneNumber.test(splitCommand[i + 1])){
            toAdd.tels.push(splitCommand[i + 1]);
            i++;
          }

        }
        i++;
      }
    }
  }
  this.deleteProperty = function () {}
  this.show = function () {}
}

function doCommand(command) {

  if (commandsRegExps.matchCreateContact.test(command))
    return parser.createContact(command);

  if (commandsRegExps.matchDeleteContact.test(command))
    return parser.deleteContact(command);

  if (commandsRegExps.matchAddProperty.test(command))
    return parser.addProperty(command);

  if (commandsRegExps.matchDeleteProperty.test(command))
    return parser.deleteProperty(command);

  if (commandsRegExps.matchShow.test(command))
    return parser.show(command);

  return {'error': 1};
}

/**
 * Выполнение запроса на языке pbQL
 * @param {string} query
 * @returns {string[]} - строки с результатами запроса
 */
function run(query) {
  let commands = query.split(';');
  let queryResponse = [];

  for (let commandIndex = 0; commandIndex < commands.length; commandIndex++) {
    let command = commands[commandIndex];

    let commandResponse = doCommand(command);
  }
  return queryResponse;
}

module.exports = {phoneBook, run, testCommandName};