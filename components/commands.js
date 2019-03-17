const User = require('../models/user');
const addUser = (list, id, name, age) => [...list, new User(id, name, age)];
const removeUser = (list, id, name, age) => {
    const result = list.find(u => u.id === id);
    if (result) {
        list.splice(list.indexOf(result), 1);
    }
    return list;
};

class Command {
    constructor(execute, undo, ...value) {
        this.execute = execute;
        this.undo = undo;
        this.value = value;
    }
};

const AddUserCommand = (id, name, age) => {
    return new Command(addUser, removeUser, id, name, age);
};
const RemoveUserCommand = (id, name, age) => {
    return new Command(addUser, removeUser, id);
};


class UsersManager {
    constructor() {
        this.usersList = [];
        this.commands = [];
        this.redoCommands = [];
        return {
            execute: (command) => {
                this.usersList = command.execute(this.usersList, ...command.value);
                this.commands.push(command);
                console.log('this.commands:', this.commands)
            },
            undo: () => {
                const command = this.commands.pop();
                if (command) {
                    this.usersList = command.undo(this.usersList, ...command.value);
                    this.redoCommands.push(command);
                }
            },
            redo:()=>{
                const command = this.redoCommands.pop();
                if (command) {
                    this.usersList = command.execute(this.usersList, ...command.value);
                    this.commands.push(command);
                }
            },
            getCurrentValue: () => {
                return this.usersList;
            }
        };
    }
}


module.exports = {
    UsersManager,
    AddUserCommand,
    RemoveUserCommand
};