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

  matchCreate: RegExp(/^Создай\s/),
  matchCreateContact: RegExp(/^Создай контакт\s/),
  matchAddProperty: RegExp(/^Добавь\s/),
  matchAddPropertyTel: RegExp(/^Добавь\s/),
  matchAddPropertyMail: RegExp(/^Добавь\s/),
  matchDelete: RegExp(/^Удали\s/),
  matchDeleteContact: RegExp(/^Удали контакт\s/),
  matchDeletePropertyTel: RegExp(/^Удали телефон\s/),
  matchDeletePropertyMail: RegExp(/^Удали почту\s/),
  matchDeleteContactWhere: RegExp(/^Удали контакты,\s/),
  matchShow: RegExp(/^Покажи\s/),

  CreateContact: RegExp(/^Создай контакт .+$/),
  DeleteContact: RegExp(/^Удали контакт \S+$/),
  AddProperty: RegExp(/^Добавь .+ для контакта \S+$/),

  phoneNumber: RegExp(/^\d{10}$/),
  mail: RegExp(/^\S+$/),
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
    if (!phoneBook.has(contactName)) {
      phoneBook.set(contactName, {tels: [], mails: []});
    }
    return -1;
  }
  this.deleteContact = function (contactName) {
    if (phoneBook.has(contactName)) {
      phoneBook.delete(contactName);
    }
    return -1;
  }
  this.addProperty = function (phones, mails, contactName) {
    if (!phoneBook.has(contactName)) return -1;

    for (let i = 0; i < phones.length; i++) {
      if (!phoneBook.get(contactName).tels.includes(phones[i])) {
        phoneBook.get(contactName).tels.push(phones[i]);
      }
    }

    for (let i = 0; i < mails.length; i++) {
      if (!phoneBook.get(contactName).mails.includes(mails[i])) {
        phoneBook.get(contactName).mails.push(mails[i]);
      }
    }

    return -1;
  }
  this.deleteProperty = function (phones, mails, contactName) {
    if (!phoneBook.has(contactName)) return -1;

    for (let i = 0; i < phones.length; i++) {
      let phoneIndex = phoneBook.get(contactName).tels.indexOf(phones[i]);
      if (phoneIndex !== -1) {
        phoneBook.get(contactName).tels.splice(phoneIndex, 1);
      }
    }

    for (let i = 0; i < mails.length; i++) {
      let mailIndex = phoneBook.get(contactName).mails.indexOf(mails[i]);
      if (mailIndex !== -1) {
        phoneBook.get(contactName).mails.splice(mailIndex, 1);
      }
    }

    return -1;
  }
  this.structPhone = function (phone) {
    let s = '+7 (' +
        phone.slice(0, 3) +
        ') ' +
        phone.slice(3, 6) +
        '-' +
        phone.slice(6, 8) +
        '-' +
        phone.slice(8, 10);
    return s;
  }
  this.showContact = function (toShow, contactName) {
    let str = '';
    for (let i = 0; i < toShow.length; i++) {
      if (str !== '') str += ';';
      if (toShow[i] === 'имя') {
        str += contactName;
      }
      if (toShow[i] === 'почты') {
        str += phoneBook.get(contactName).mails.join(',');
      }
      if (toShow[i] === 'телефоны') {
        str += phoneBook.get(contactName).tels.map(item => this.structPhone(item)).join(',');
      }
    }
    return str;
  }
  this.show = function (toShow, query) {
    // почты, имя, телефоны
    if (query === '')
      return [];
    let answer = [];
    for (let contact of phoneBook.keys()) {

      if (contact.indexOf(query) !== -1) {
        answer.push(this.showContact(toShow, contact));
        continue;
      }

      let flag = false;

      for (let i = 0; i < phoneBook.get(contact).tels.length; i++) {
        if (phoneBook.get(contact).tels[i].indexOf(query) !== -1) {
          answer.push(this.showContact(toShow, contact));
          flag = true;
          break;
        }
      }

      if (flag) continue;

      for (let i = 0; i < phoneBook.get(contact).mails.length; i++) {
        if (phoneBook.get(contact).mails[i].indexOf(query) !== -1) {
          answer.push(this.showContact(toShow, contact));
          break;
        }
      }
    }


    return answer;

  }
  this.deleteContactWhere = function (query) {
    if (query === '') return -1;

    for (let contact of phoneBook.keys()) {
      //console.log(contact);
      if (contact.indexOf(query) !== -1) {
        phoneBook.delete(contact);
        continue;
      }
      for (let i = 0; i < phoneBook.get(contact).tels.length; i++) {
        if (phoneBook.get(contact).tels[i].indexOf(query) !== -1) {
          phoneBook.delete(contact);
          break;
        }
      }

      if (!phoneBook.has(contact)) continue;

      for (let i = 0; i < phoneBook.get(contact).mails.length; i++) {
        if (phoneBook.get(contact).mails[i].indexOf(query) !== -1) {
          phoneBook.delete(contact);
          break;
        }
      }
    }

    return -1;
  }
  this.break = function () {
    this.createContact = function () {
      return -1;
    };
    this.deleteContact = function () {
      return -1;
    };
    this.addProperty = function () {
      return -1;
    };
    this.deleteProperty = function () {
      return -1;
    };
    this.show = function () {
      return -1;
    };
    this.deleteContactWhere = function () {
      return -1;
    };
  }
}

function Parser() {
  this.createContact = function (command) {
    if (command.length > 15) {
      return phoneBookInstance.createContact(command.slice(15, command.length));
    }
    if (command.length === 15) {
      return -1;
    }
    return 16;
  }
  this.deleteContact = function (command) {
    let splitCommand = command.split(' ');
    if (command.length > 14) {
      return phoneBookInstance.deleteContact(command.slice(14, command.length));
    }
    if (command.length === 14) {
      return -1;
    }
    return 15;

  }
  this.addProperty = function (command) {
    let words = command.split(' ');
    // Добавь телефон 5556667788 и телефон 5556667787 и почту grisha@example.com для контакта Григорий
    let i = 1;
    let errorIndex = words[0].length + 2;
    let afterUnion = true;
    let phones = [];
    let mails = [];
    let contactName;

    while (i < words.length && words[i] !== 'для') {
      if (words[i] === '') {
        return errorIndex;
      }
      if (words[i] === 'и') {
        if (!afterUnion) {
          afterUnion = true;
          errorIndex += 2;
          i++;
          continue;
        } else {
          return errorIndex;
        }
      }

      if ((words[i] === 'телефон' || words[i] === 'почту') && !afterUnion) return errorIndex;
      let j = i + 1;

      //console.log(`i: ${i}, words[i]: ${words[i]}, words.length: ${words.length}, command: \'${command}\', command.length: ${command.length}`)
      if (words[i] === 'телефон') {
        errorIndex += 8;

        if (words.length === j) return errorIndex - 1;
        if (words[j] === '') return errorIndex;
        if (!commandsRegExps.phoneNumber.test(words[j])) return errorIndex;

        phones.push(words[j]);
        errorIndex += 11;
        afterUnion = false;
        i = j + 1;
        continue;
      }

      if (words[i] === 'почту') {
        errorIndex += 6;

        if (words.length === j) return errorIndex - 1;
        if (words[j] === '') return errorIndex;
        if (!commandsRegExps.mail.test(words[j])) return errorIndex;

        mails.push(words[j]);
        errorIndex += (words[j].length + 1);
        afterUnion = false;
        i = j + 1;
        continue;
      }
      return errorIndex;
    }

    if (i === words.length) return command.length + 1;
    if (words[i] !== 'для' || afterUnion) return errorIndex;
    if (i + 1 === words.length) return command.length + 1;

    errorIndex += 4;
    i++;

    if (i === words.length) return command.length;
    if (words[i] !== 'контакта') return errorIndex;
    if (i + 1 === words.length) return command.length + 1;

    errorIndex += 9;
    i++;

    if (i === words.length) return command.length;
    if (words[i] === '') return errorIndex;

    //contactName = words[i];
    return phoneBookInstance.addProperty(phones, mails, command.slice(errorIndex - 1, command.length));
    //console.log(command.slice(errorIndex - 1, command.length));
    /*
    i++;

    if (i !== words.length) return (errorIndex + words[i - 1].length);

    return phoneBookInstance.addProperty(phones, mails, contactName);
     */
  }
  this.deleteProperty = function (command) {
    let words = command.split(' ');
    // Добавь телефон 5556667788 и телефон 5556667787 и почту grisha@example.com для контакта Григорий
    let i = 1;
    let errorIndex = words[0].length + 2;
    let afterUnion = true;
    let phones = [];
    let mails = [];
    let contactName;

    while (i < words.length && words[i] !== 'для') {
      if (words[i] === '') {
        return errorIndex;
      }
      if (words[i] === 'и') {
        if (!afterUnion) {
          afterUnion = true;
          errorIndex += 2;
          i++;
          continue;
        } else {
          return errorIndex;
        }
      }

      if ((words[i] === 'телефон' || words[i] === 'почту') && !afterUnion) return errorIndex;
      let j = i + 1;

      //console.log(`i: ${i}, words[i]: ${words[i]}, words.length: ${words.length}, command: \'${command}\', command.length: ${command.length}`)
      if (words[i] === 'телефон') {
        errorIndex += 8;

        if (words.length === j) return errorIndex - 1;
        if (words[j] === '') return errorIndex;
        if (!commandsRegExps.phoneNumber.test(words[j])) return errorIndex;

        phones.push(words[j]);
        errorIndex += 11;
        afterUnion = false;
        i = j + 1;
        continue;
      }

      if (words[i] === 'почту') {
        errorIndex += 6;

        if (words.length === j) return errorIndex - 1;
        if (words[j] === '') return errorIndex;
        if (!commandsRegExps.mail.test(words[j])) return errorIndex;

        mails.push(words[j]);
        errorIndex += (words[j].length + 1);
        afterUnion = false;
        i = j + 1;
        continue;
      }
      return errorIndex;
    }

    if (i === words.length) return command.length + 1;
    if (words[i] !== 'для' || afterUnion) return errorIndex;
    if (i + 1 === words.length) return command.length + 1;

    errorIndex += 4;
    i++;

    if (i === words.length) return command.length;
    if (words[i] !== 'контакта') return errorIndex;
    if (i + 1 === words.length) return command.length + 1;

    errorIndex += 9;
    i++;

    if (i === words.length) return command.length;
    if (words[i] === '') return errorIndex;

    return phoneBookInstance.deleteProperty(phones, mails, command.slice(errorIndex - 1, command.length));
    /*
    contactName = words[i];
    i++;

    if (i !== words.length) return (errorIndex + words[i - 1].length);

    return phoneBookInstance.deleteProperty(phones, mails, contactName);

     */
  }
  this.show = function (command) {
    // Покажи почты и телефоны для контактов, где есть <запрос>
    // Покажи *
    let errorIndex = 8;
    let words = command.split(' ');
    let afterUnion = true;
    let query = '';
    let toShow = [];

    for (let i = 1; i < words.length; i++) {
      //console.log(command + ': ' + command[errorIndex - 1] + ' : ' + words[i]);
      if (words[i] === '') return errorIndex;
      if ((words[i] === 'почты' || words[i] === 'имя' || words[i] === 'телефоны') && afterUnion) {
        toShow.push(words[i]);
        afterUnion = false;
        errorIndex += words[i].length + 1;
        if (i + 1 === words.length) return errorIndex - 1;
        continue;
      }
      if (words[i] === 'и') {
        if (afterUnion) return errorIndex;
        else {
          afterUnion = true;
          errorIndex += 2;
          if (i + 1 === words.length) return errorIndex - 1;
        }
        continue;
      }
      if (words[i] === 'для') {
        if (afterUnion) return errorIndex;
        errorIndex += 4;
        i++;
        if (i !== words.length) {
          //console.log(command[errorIndex]);
          if (words[i] === 'контактов,') {
            errorIndex += 11
            i++;
            if (i !== words.length) {
              //console.log(command[errorIndex]);
              if (words[i] === 'где') {
                errorIndex += 4
                i++;
                if (i !== words.length) {
                  //console.log(command[errorIndex]);
                  if (words[i] === 'есть') {
                    errorIndex += 5
                    i++;
                    if (i !== words.length) {
                      //console.log(command[errorIndex]);
                      query = command.slice(errorIndex - 1, command.length);
                      return phoneBookInstance.show(toShow, query);
                    }
                    return errorIndex - 1;
                  }
                  return errorIndex;
                }
                return errorIndex - 1;
              }
              return errorIndex;
            }
            return errorIndex - 1;
          }
          return errorIndex;
        }
        return errorIndex - 1;
      }
      return errorIndex;
    }
  }
  this.deleteContactWhere = function (command) {
    // Удали контакты, где есть <запрос>
    // Удали контакты, *
    let errorIndex = 17;
    let words = command.split(' ');
    let query = '';
    let i = 2;

    //console.log(command[errorIndex]);
    if (words[i] === 'где') {
      //console.log('i: ' + i + ', words[i]: ' + words[i] + ',' )
      errorIndex += 4
      i++;
      if (i !== words.length) {

        if (words[i] === 'есть') {
          errorIndex += 5
          i++;
          if (i !== words.length) {
            //console.log(command[errorIndex]);
            query = command.slice(errorIndex - 1, command.length);
            return phoneBookInstance.deleteContactWhere(query);
          }
          return errorIndex - 1;
        }
        return errorIndex;
      }
      return errorIndex - 1;
    }
    return errorIndex;

  }

}

function doCommand(command) {
  if (command === 'Добавь') return 7;
  if (command === 'Создай') return 7;
  if (command === 'Удали') return 6;
  if (command === 'Покажи') return 7;

  // Создай контакт
  if (commandsRegExps.matchCreate.test(command)) {
    // Создай *
    if (commandsRegExps.matchCreateContact.test(command))
        // Создай контакт *
      return parser.createContact(command);
    if (command === 'Создай контакт')
      return 15;
    return 8;
  }

  if (commandsRegExps.matchDelete.test(command)) {
    if (commandsRegExps.matchDeleteContact.test(command))
      return parser.deleteContact(command);
    if (commandsRegExps.matchDeletePropertyTel.test(command))
      return parser.deleteProperty(command);
    if (commandsRegExps.matchDeletePropertyMail.test(command))
      return parser.deleteProperty(command);
    if (commandsRegExps.matchDeleteContactWhere.test(command))
      return parser.deleteContactWhere(command);
    if (command === 'Удали контакты,')
      return 16;
    if (command === 'Удали контакт')
      return 14;
    return 7;
  }

  if (commandsRegExps.matchAddProperty.test(command)) {
    return parser.addProperty(command);
  }

  if (commandsRegExps.matchShow.test(command))
    return parser.show(command);

  return 1;
}

/**
 * Выполнение запроса на языке pbQL
 * @param {string} query
 * @returns {string[]} - строки с результатами запроса
 */
function run(query) {
  let commands = query.split(';');
  let queryResponse = [];
  let errorIndex = 0;
  let array = []

  for (let commandIndex = 0; commandIndex < commands.length; commandIndex++) {

    if (commandIndex === commands.length - 1 && commands[commands.length - 1] === '')
      break;

    if (commands[commands.length - 1] !== '') {
      if (commandIndex === commands.length - 1) {
        phoneBookInstance.break();
      }
    }

    let command = commands[commandIndex];
    let response = doCommand(command);

    if (commands[commands.length - 1] !== '') {
      if (commandIndex === commands.length - 1) {
        if (response === -1 || Array.isArray(response))
          response = commands[commandIndex].length + 1;
      }
    }

    if (response !== -1 && !Array.isArray(response)) {
      //console.log('ERROR: ' + command + ', errorIndex: ' + (errorIndex + response));
      syntaxError(commandIndex + 1, response);
    }
    if (Array.isArray(response)) array = array.concat(response);
    queryResponse.push(response);
    errorIndex += command.length;
  }
  //return array;
  return queryResponse;
}

module.exports = {phoneBook, run};