const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", () =>
  {
    let roverObject = new Rover("The Surface.",'NORMAL',110);

      expect(roverObject.position).toBe("The Surface.");
      expect(roverObject.mode).toBe('NORMAL');
      expect(roverObject.generatorWatts).toBe(110);
  });

  test("response returned by receiveMessage contains the name of the message", () =>
  {
      let message = new Rover;
      let objects = [new Command('MOVE'), new Command('Jump')];
      let messageObject = new Message("Rover", objects);
      let names = message.receiveMessage(messageObject);
      expect(names.message).toBe("Rover");

  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", () =>
  {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command ('STATUS_CHECK')];
      let message = new Message("Message with two commands", commands);
      let rover = new Rover(98382);
      let y = rover.receiveMessage(message);
      //let response = rover.recieveMessage(message);

      expect(y.results.length).toBe(2);

  });

  test("responds correctly to the status check command", () =>
  {
    let commands = [new Command ('STATUS_CHECK')];
    let message = new Message("Message", commands);
    let rover = new Rover(98382);
    let y = rover.receiveMessage(message);  
    expect(y.results[0].roverStatus.position).toBe(98382);
    expect(y.results[0].roverStatus.generatorWatts).toBe(110);
    expect(y.results[0].roverStatus.mode).toBe('NORMAL');

  });

  test("responds correctly to the mode change command", () =>
  {
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
      let message = new Message("Message with two commands", commands);
      let rover = new Rover(98382);
      let y = rover.receiveMessage(message);
      
      expect(rover.mode).toBe('LOW_POWER');
      expect(y.results).toEqual([{completed : true}]);
  });
});

test("responds with a false completed value when attempting to move in LOW_POWER mode", () =>
{
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 9000)];
    let message = new Message("Message with two commands", commands);
    let rover = new Rover(98382);
    let y = rover.receiveMessage(message);
    expect(rover.mode).toBe('LOW_POWER');
    expect(y.results[1]).toEqual({completed : false});
});

test("responds with the position for the move command", () =>
{
    let commands = [new Command('MOVE', 9000)];
    let message = new Message("Message with two commands", commands);
    let rover = new Rover(98382);
    let y = rover.receiveMessage(message);
    expect(rover.position).toBe(9000);
});