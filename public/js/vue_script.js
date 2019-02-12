
var socket = io();
function MenuItem(name, kcal, containsGluten, containsLactos, img) {
    this.name= name;
    this.kcal=kcal;
    this.containsGluten = containsGluten;
    this.containsLactos= containsLactos;
    this.img = img;
    this.getName = function () {
        return "Name: " + this.name + ", kCal:  " + this.kcal;
    }
}
var menuArray = [];
for (i = 0; i < food.length; i++) { 
    menuArray[i] = new MenuItem(food[i].name, food[i].kCal, food[i].lactose, food[i].gluten, food[i].img);
}

var vm = new Vue({
    el:'#first',
    data: {
        selectBurger: "Select Burger " + Date(),
        selectB: "Select Burger",
        introtext: "This is where you execute burger selection",
        menuArray: menuArray
        
    }
});


function answer() {
    var ansArray = [document.getElementById('name').value, document.getElementById('email').value, document.getElementById('payment').value, document.querySelector("input[name=gender]:checked").value];
    if (document.querySelector("input[name=selectedBurger]:checked") !=null) {
        var tmp = document.getElementsByName('selectedBurger');
        for (i = 0; i < tmp.length; i++) {
            if (tmp[i].checked){   
                ansArray[ansArray.length] = tmp[i].value;
            }
        }
    }
    return ansArray;
}

var buttonClick = new Vue ({
    el: '#testa',
    data: {
        output: null,
        orders: {}
    },
    methods: {
        markDone: function () {
            var arr = answer();
            var string = "Name: " + arr[0] + ", Email: " + arr[1] + ", Payment option: " + arr[2] + ", Gender: " + arr[3] + ", Burgers selected: ";
            if (arr.length==4) {
                string = string + "none";
            }
            else {
                for (i = 4; i <= arr.length-2; i++) {
                    string  = string + arr[i] +", ";
                }
                string = string + arr[i] + ".";
            }
            
            this.output = string;
        },
         getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
             return lastOrder + 1;
    },
        addOrder: function (event) {
             console.log(this.orders[0]);
            socket.emit('addOrder', this.orders[0] );
            this.markDone();
   /*var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
        socket.emit("addOrder", { orderId: this.getNext(),
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                                orderItems: ["Beans", "Curry"]
                                })*/
    },
         displayOrder: function (event) {
          var offset = {x: event.currentTarget.getBoundingClientRect().left,
                        y: event.currentTarget.getBoundingClientRect().top};
             Vue.set(this.orders,0,  {orderId: 0, 
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                               orderItems: ["beans", "curry"]
                                     });
         }
    }
});
