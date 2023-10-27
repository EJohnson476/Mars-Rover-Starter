class Message {
   // Write code here!
   constructor(name,commands)
   {
      this.name = name;
      this.commands = commands;
      if(!name)
      {
         throw Error("Name required.")
      }
   }
}

//let fox = new Message("elijah",[1,2,3]);
//console.log(Array.isArray(fox.commands));
module.exports = Message;