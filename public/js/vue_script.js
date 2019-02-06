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
    var ansArray = [document.getElementById('name').value, document.getElementById('email').value,document.getElementById('street').value, document.getElementById('house').value, document.getElementById('payment').value, document.querySelector("input[name=gender]:checked").value];
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
    el: '#orders',
    data: {
        output: null
    },
    methods: {
        markDone: function () {
            var arr = answer();
            var string = "Name: " + arr[0] + ", Email: " + arr[1] + ", Street: " + arr[2] + ", House: " + arr[3] + ", Payment option: " + arr[4] + ", Gender: " + arr[5] + ", Burgers selected: ";
            if (arr.length==6) {
                string = string + "none";
            }
            else {
                for (i = 6; i <= arr.length-2; i++) {
                    string  = string + arr[i] +", ";
                }
                string = string + arr[i] + ".";
            }
            
            this.output = string;
        }
    }
})
