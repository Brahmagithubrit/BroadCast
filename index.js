const exp = require('express') 
const http = require('http')  
const path = require('path')
const { Server } = require('socket.io')





const app = exp();
const server = http.createServer(app); // parse the express app here 


const io = new Server(server)


io.on("connection" , (socket) => {
          console.log("a new user is created " , socket.id);
          socket.on("message_send_to_server" , message => {   // here if something comes from frontend just send to all  // like broadcast 
                    console.log(message);
                    io.emit("message_from_server" , message)                    
          } ) 
})

app.use(exp.static(path.resolve("")))

app.get('/' , (req , res)=>{
          return res.sendFile(path.join(__dirname,'index.html'))
})


app.get('/check' , (req , res) => {
          res.json({
                    name : "brahma",
                    message : " hi browser , i am server "
          })
})



server.listen(5000 , () =>console.log("server running .............")); // here you cant directly use app.listen bcuz we are integrating the websocket 