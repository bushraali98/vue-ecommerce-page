// ----- product component ------

Vue.component('product', {
    props: {
        product: Object,
        discountedPrice: Number,
    },
    template: `
    <div class="product">
            <image-gallery></image-gallery>
            <div class="product-details">
                <product-description :product="product" :discounted-price="discountedPrice"></product-description>
                <div class="cart-details">
                    <div> <button class="minus-buttun" v-on:click="decreamentProduct">-</button> </div>
                    <div class="count"> <p id="text">{{count}}</p> </div>
                    <div> <button class="pluss-buttun" v-on:click="increamentProduct">+</button> </div>
                    <div> <button class="cart-button" :class="product.quantity === 0 ? 'disabled-button' : ''" v-on:click="addToCart"> <i class="fa-solid fa-cart-shopping"></i> add to cart</button> </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            count: 1,
        }
    }, 
    methods: {
        increamentProduct() {
            this.count++
        },
        decreamentProduct () {
            if (this.count > 1 ) {
                this.count--
            }
        },
        addToCart() {
            this.$emit('add-to-cart', this.product,this.count); // Emit event with count and product
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
    props: {
        product: Object,
        discountedPrice: Number,
    },
    template: `
    <div id="product-name">
        <h1 class="barnd-name">SNEAKER COMPANY</h1>
        <h1>{{ product.name }}</h1>
        <p>These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.</p>
        <p id="text" v-if="product.quantity === 0">Out of Stock!!!</p> 
        <p :class="product.discount > 0 ? 'on-sale' : ''">$ {{ product.price }}</p>
        <div class="discount-badge" v-if="product.discount > 0">
                {{ product.discount }}% OFF
        </div>
        <p v-if="product.discount > 0" class="discounted-price">$ {{ discountedPrice }}</p>
        <p v-else v-show="product.discount > 0">$ {{ product.price }}</p>
    </div>
    `,
    data() {
        return {
        }
    },
})


// ---------- preview component --------

Vue.component('cart-preview', {
    props: {
        cartItems: Array,
        discountedPrice: Number,
        product: Object,
        cartTotal: [Number, String]
    },
    template: `
      <div class="cart-preview">
        <div class="cart-header">
            <h2>Cart</h2>
            <hr class="grey-line">
        </div>
        <div v-if="cartItems.length === 0">
            Your cart is empty.
        </div>
        <div v-else>
        <div v-for="(item, index) in cartItems" class="cart-item">
          <img :src="item.product.image" alt="Product image" class="product-image">
          <div class="product-info">
            <p class="product-name">{{ item.product.name }}</p>
            <p class="product-price">$ {{ cartTotal }} x {{item.count}}</p>
          </div>
          <button class="delete-button" @click="removeFromCart(index)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <button class="checkout-button" v-if="cartItems.length > 0">Checkout</button>
      </div>
      </div>
    `,
    methods: {
      removeFromCart(index) {
        this.$emit('remove-from-cart', index);
      },
    },
  });


var app = new Vue({
    el: '#app',
    data: {
        product: {
            id: 1,
            name: 'Fall Limited Edition Sneakers',
            image: 'assets/img1.jpg',
            price: 250.00,
            discount: 50,
            quantity: 10
        },
        cart: 0,
        cartItems: [],
        showCartPreview: false,
    },
    computed: {
        discountedPrice() {
            return Number((this.product.price * (1 - (this.product.discount / 100))).toFixed(2));
        },
        cartTotal() {
            let total = 0;
            for (let i = 0; i < this.cartItems.length; i++) {
              const item = this.cartItems[i];
              if (item.product.discount > 0 ) {
                total += this.discountedPrice * item.count;
                return Number(total);
              } else {
                total += item.product.price * item.count;
                return Number(total);
              }
            }
        },
    },
    methods: {
        updateCart(product, count) {
            const existingItem = this.cartItems.find(item => item.product === product);

            if (existingItem) {
                existingItem.count += count;
            } else {
                this.cartItems.push({product, count});
            }
            this.cart += count;
        },
        removeFromCart(cartItem) {
            this.cart -= cartItem.count;
            this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
        }
    },
  });
