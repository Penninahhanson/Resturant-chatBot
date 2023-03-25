const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const formatMessages = require('./utility/utility')
const foodStore = require('./models/foodItems')
const Cart = require('./models/cart')
const cookieParser = require('cookie-parser')

const session = require('express-session')({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 1000 * 60 *60 *48,
        secure: false,
        httpOnly: true
    } 

});

const socket_io_session = require('@kobalab/socket.io-session')(session);

const port = 8080 || process.env.PORT
const app = express()

app.use(session)

app.use(cookieParser())

// This is needed in other to use socket.io
const server = http.createServer(app)
const io = socketio(server);
 

//Progress Order of the logic cases
let progressCount = 0
let progress=2

io.use(socket_io_session.express_session);

//Run when client connects
io.on('connection',(socket)=>{
    console.log(`User ${socket.id} connected....`)
    
    //Emit a message when a user connects.
    socket.emit('Botmessage',formatMessages(`Welcome to the resturant.<br>
    Please input <b> menu</b> to see options`))
   
    //Listen for ResturantChat messgaes from client end
    socket.on('ResturantMessages',(msg)=>{
        //   console.log(msg)
        console.log(socket.request.session);
       socket.request.session.ResturantChat = msg
       socket.request.session.save();
        socket.emit('chats',formatMessages(msg))

        // CONDITIONAL STATEMENT
        switch(msg){
            case "menu":
                socket.emit('MenuOption')
                break             
        }

        switch(progressCount){
            case 0:
                switch(msg){
                    case "1":
                        socket.emit('food menu',foodStore)
                        progressCount =1
                        break
                }
                break
            case 1:
                switch(msg){
                    case "11":
                        switch(progress){
                            case 2:
                               Cart.save(foodStore.afiaefereandPoundedyam)
                               socket.emit('Botmessage',formatMessages(
                               `Order for ${Object.values(foodStore.afiaefereandPoundedyam.title).join('')}
                               Received.<br>Please select <b> 1 </b> to add food to cart or select 99 to checkout order`))
                               break   
                        }
                        break
                    case "12":
                         switch(progress){
                            case 2:
                                Cart.save(foodStore.edikanikongandFufu)
                                socket.emit('Botmessage',formatMessages( 
                                `Order for ${Object.values(foodStore.edikanikongandFufu.title).join('')}
                                Received.<br>Please select <b> 1 </b> to add food to cart or select 99 to checkout order`))
                                break
                         }
                      break
                    case "13":
                         switch(progress){
                            case 2:
                                Cart.save(foodStore.afangandEba)
                                socket.emit('Botmessage',formatMessages( 
                                `Order for ${Object.values(foodStore.afangandEba.title).join('')}
                                Received.<br>Please select <b> 1 </b> to add food to cart or select 99 to checkout order`))
                                progressCount = 0
                                break          
                         }
                         progressCount = 0
                      break      
                }
                progressCount= 0
                break  
        }
        switch(msg){
            case "99":
              if(Cart.getCart()===null){
                socket.emit('Botmessage',formatMessages(`No order to place.<br>Please select <b> 1 </b> to see list of food items`))
                      }else{
                          Cart.getCart()
                          socket.emit('Botmessage',formatMessages(`Order placed.<br>Please select <b> 97 </b> to see current order`)) 
                     }
                  progressCount = 0   
               break 
        }
        switch(msg){
            case "97":
              if(Cart.getCart()===null){
                socket.emit('Botmessage',formatMessages(`No order to place.<br>Please select <b> 1 </b> to see list of food items`))
                      }else{
                          console.log(Cart.getCart())
                          socket.emit('CurrentOrder',Cart.getCart()) 
                     }
                  progressCount = 0   
               break 
        }
        switch(msg){
            case "0":
              if(Cart.getCart()===null){
                socket.emit('Botmessage',formatMessages(`No order to place.<br>Please select <b> 1 </b> to see list of food items`))
                      }else{
                          Object.keys(Cart.getCart()).map(key=>Cart.getCart[key]==null)
                          socket.emit('Botmessage',formatMessages(`order has been cancelled.<br>Please select <b> menu</b> to see options`))
                     }
                  progressCount = 0   
               break 
        }
        
    })
    // disconnet
    socket.on('disconnect',()=>{
       console.log('disconnected...')
    })
})

app.use(express.static('public'))

app.set('view engine','ejs')



app.get('/',(req,res)=>{
    res.render("resturantChatBot")
})


server.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`)
})



