const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position)
   {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   };

   receiveMessage(message)
   {
      if(typeof(message) === 'object')
      {
         
         if(Array.isArray(message.commands) && message.commands.length > 1)
         {
            let newObject = {message : message.name, results : []};
            let newArray =[];
         for(let i = 0; i < message.commands.length; i++)
            {
               if(message.commands[i].commandType === 'MOVE')
               {
                  if(this.mode === 'LOW_POWER')
                  {
                     let lowObject = {completed: false};
                     newArray.push(lowObject);
                     continue;
                  }
                  this.position = message.commands[i].value;
                  let moveObject = {completed : true};
                  newArray.push(moveObject);
               }
               else if(message.commands[i].commandType === 'MODE_CHANGE')
               {
                  this.mode = message.commands[i].value;
                  let modeObject = {completed : true};
                  newArray.push(modeObject);
               }
               else if(message.commands[i].commandType === 'STATUS_CHECK')
               {
                  let rover = {position: this.position, mode: this.mode, generatorWatts: this.generatorWatts};
                  let statusObject = {completed : true, roverStatus : rover}
                  newArray.push(statusObject);
               }
            }
            newObject.results = newArray;
            return newObject;
            
         }
         else
         {
            let newObject = {message : message.name, results : []};
            let newArray =[];

            if(message.commands[0].commandType === 'MOVE')
            {
               if(this.mode === 'LOW_POWER')
               {
                  let lowObject = {completed: false};
                  newArray.push(lowObject);
                  newObject.results = newArray;
                  return newObject;
               }
               this.position = message.commands[0].value;
               let moveObject = {completed : true};
               newArray.push(moveObject);
            }
            else if(message.commands[0].commandType === 'MODE_CHANGE')
            {
               this.mode = message.commands[0].value;
               let modeObject = {completed : true};
               newArray.push(modeObject);
            }
            else if (message.commands[0].commandType === 'STATUS_CHECK')
            {
               let rover = {position: this.position, mode: this.mode, generatorWatts: this.generatorWatts};
               let statusObject = {completed : true, roverStatus : rover}
               newArray.push(statusObject);
            }
            newObject.results = newArray;
            return newObject;
         }
      }
   };

}

//let message = new Rover;

//let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command ('STATUS_CHECK'), new Command('MOVE', 9000)];
//let commands = [new Command ('STATUS_CHECK')];
//let message = new Message("Message with two commands", commands);
//let rover = new Rover(98382);
//let x = new Rover;
//let y = rover.receiveMessage(message);
//console.log(rover);
//console.log(message);
//console.log(y);
//console.log(y.results);


module.exports = Rover;