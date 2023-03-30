// ----- product component ------

Vue.component('product', {
    template: `
    <div class="product">
            <image-gallery></image-gallery>
            <div class="product-details">
                <product-description></product-description>
                <div class="cart-details">
                    <div> <button class="minus-buttun" v-on:click="decreamentProduct">-</button> </div>
                    <div class="count"> <p id="text">{{count}}</p> </div>
                    <div> <button class="pluss-buttun" v-on:click="increamentProduct">+</button> </div>
                    <div> <button class="cart-button" v-on:click="addToCart"> <i class="fa-solid fa-cart-shopping"></i> add to cart</button> </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            count: 0,
        }
    }, 
    methods: {
        increamentProduct() {
            this.count++
        },
        decreamentProduct () {
            if (this.count > 0 ) {
                this.count--
            }
        },
        addToCart() {
            //To-Do
        }
    },
})

// ----- image gallery component ------

Vue.component('image-gallery', {
    template: `
    <div class="images">
        <div class="container">
            <img id="expandedImg" :src="expandedImage" style="width: 100%;">
        </div>
        <div class="row">
            <div class="column">
                <img :src="img1" v-on:click="updateImage(img1)" alt="" width="100%">
            </div>
            <div class="column">
                <img :src="img3" v-on:click="updateImage(img3)" alt="" width="100%">
            </div>
            <div class="column">
                <img :src="img2" v-on:click="updateImage(img2)" alt="" width="100%">
            </div>
            <div class="column"> 
                <img :src="img4" v-on:click="updateImage(img4)" width="100%" height="96px">
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            expandedImage: 'assets/img1.jpg', 
            img1: 'assets/img1.jpg',
            img2: 'assets/img2.jpg',
            img3: 'assets/img3.jpg',
            img4: 'assets/img4.jpg',
        }
    }, 
    methods: {
        updateImage(img) {
            this.expandedImage = img 
        },
    }
})

// ----- product details component ------

Vue.component('product-description', {
    template: `
        <div id="product-name">
            <h1 class="barnd-name">SNEAKER COMPANY</h1>
            <h1>{{ product }}</h1>
            <p>These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.</p>
            <div> <p>$ {{price}}</p> </div>
        </div>
    `,
    data() {
        return {
            product: 'Fall Limited Edition Sneakers',
            price: 125.00
        }
    },
})

var app = new Vue({
    el: '#app',
    data: {
        cart: 0,
    },
    methods: {
    }
})
