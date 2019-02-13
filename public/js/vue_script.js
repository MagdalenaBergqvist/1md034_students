
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
    el: '#second',
    data: {
        output: null,
        orders: {},
        orderId: -1,
        burgers: null,
    },
    methods: {
        markDone: function () {
            var arr = answer();
            var burgers = [];
            var string = "Name: " + arr[0] + ", Email: " + arr[1] + ", Payment option: " + arr[2] + ", Gender: " + arr[3];
            if (arr.length==4) {
                burgers = burgers + "None";
            }
            else {
                for (i = 4; i <= arr.length-2; i++) {
                    burgers  = burgers + arr[i] +", ";
                }
                burgers = burgers + arr[i] + ".";
            }
            
            this.output = string;
            this.burgers = burgers;
        },
        addOrder: function (event) {
            if (this.orders[0] == undefined) {
                
            }
            else {
            this.orderId = this.orderId + 1;
             var arr = answer();
            this.orderInfo = [arr[0], arr[1], arr[2], arr[3]];
            var string = [];
             if (arr.length==4) {
                string = [];
            }
            else {
                var x = 0; 
                for (i = 4; i <= arr.length-1; i++) {
                    string[x]  = arr[i];
                    x++;
                }
            }
            this.orders[0].orderItems = string;
            this.orders[0].orderId = this.orderId;
            this.orders[0].orderInfo = this.orderInfo;
            socket.emit('addOrder', this.orders[0] );
            this.markDone();
            }
    },
         displayOrder: function (event) {
          var offset = {x: event.currentTarget.getBoundingClientRect().left,
                        y: event.currentTarget.getBoundingClientRect().top};
             Vue.set(this.orders,0,  {orderId: 0, 
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                                      orderItems: [],
                                      orderInfo: []
                                     });
         }
    }
});
