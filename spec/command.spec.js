const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  test("Constructor sets command type.", () =>
  {
    let command = new Command("MOVE");
    expect(command.commandType).toBe("MOVE");
  });

  test( "constructor sets a value passed in as the 2nd argument. ", () =>
  {
    let type = new Command("MOVE",7);
    expect(type.value).toBe(7);
  });
});
