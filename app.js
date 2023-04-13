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
            this.$emit('add-to-cart', this.count); // Emit event with count
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


// ---------- preview component --------

Vue.component('cart-preview', {
    template: `
      <div class="cart-preview">
        <div v-for="(item, index) in cartItems" class="cart-item">
          <img :src="item.image" alt="Product image" class="product-image">
          <div class="product-info">
            <p class="product-name">{{ item.name }}</p>
            <p class="product-price">$ {{ item.price }}</p>
          </div>
          <button class="delete-button" @click="removeFromCart(index)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <button class="checkout-button" v-if="cartItems.length > 0">Checkout</button>
      </div>
    `,
    props: ['cartItems'],
    methods: {
      removeFromCart(index) {
        this.$emit('remove-from-cart', index);
      },
    },
  });


var app = new Vue({
    el: '#app',
    data: {
      cart: 0,
      cartItems: [],
      showCartPreview: false,
    },
    methods: {
      updateCart(count) {
        // Update the cart total
        this.cart += count;
        // Add the item to the cartItems array
        this.cartItems.push({
          name: 'Fall Limited Edition Sneakers',
          price: 125.0,
          image: 'assets/img1.jpg',
        });
      },
      removeFromCart(index) {
        this.cart -= 1;
        this.cartItems.splice(index, 1);
      },
    },
  });
