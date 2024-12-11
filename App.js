import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput, Alert } from 'react-native';

// ProductCard component displays individual product information
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        {/* Button to add product to cart */}
        <TouchableOpacity style={styles.addToCart} onPress={() => onAddToCart(product)}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// AuthScreen component handles user authentication (login/signup)
const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [email, setEmail] = useState(''); // Email input state
  const [password, setPassword] = useState(''); // Password input state
  const [username, setUsername] = useState(''); // Username input state for signup

  // Function to handle form submission
  const handleSubmit = () => {
    if (isLogin) {
      // Validate login credentials
      if (email.trim() === '' || password.trim() === '') {
        Alert.alert('Error', 'Both email and password are required.');
        return;
      }
      if (email === 'user1' && password === '1234') {
        Alert.alert('Success', 'Logged in successfully!');
        onLogin();
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } else {
      // Validate signup details
      if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        Alert.alert('Error', 'Username, email, and password are required.');
        return;
      }
      Alert.alert('Success', 'Signed up successfully!');
      onLogin();
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      {/* Username input appears only during signup */}
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      )}
      {/* Email input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>
      {/* Toggle between login and signup */}
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Main App component managing the overall application state
const App = () => {
  const [cart, setCart] = useState([]); // State for storing cart items
  const [currentCategory, setCurrentCategory] = useState('women'); // Current product category
  const [isModalVisible, setModalVisible] = useState(false); // State for cart modal visibility
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [searchQuery, setSearchQuery] = useState(''); // Search input state
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false); // State for payment modal visibility

  const menProducts = [
    // Men products data...
    {
      id: 1,
      title: 'Men\'s T-Shirt',
      price: 29.99,
      description: 'Comfortable and stylish t-shirt for men.',
      image: 'https://via.placeholder.com/300x200/ff7f50/ffffff?text=Men+T-Shirt',
    },
    {
      id: 2,
      title: 'Men\'s Jeans',
      price: 49.99,
      description: 'Classic denim jeans for everyday wear.',
      image: 'https://via.placeholder.com/300x200/4682b4/ffffff?text=Men+Jeans',
    },
    {
      id: 3,
      title: 'Men\'s Jacket',
      price: 89.99,
      description: 'Stylish jacket for colder days.',
      image: 'https://via.placeholder.com/300x200/8b4513/ffffff?text=Men+Jacket',
    },
    {
      id: 4,
      title: 'Men\'s Sneakers',
      price: 79.99,
      description: 'Comfortable sneakers for daily use.',
      image: 'https://via.placeholder.com/300x200/00ced1/ffffff?text=Men+Sneakers',
    },
    {
      id: 5,
      title: 'Men\'s Hoodie',
      price: 59.99,
      description: 'Warm hoodie perfect for chilly days.',
      image: 'https://via.placeholder.com/300x200/ff4500/ffffff?text=Men+Hoodie',
    },
    {
      id: 6,
      title: 'Men\'s Shorts',
      price: 39.99,
      description: 'Cool shorts for summer wear.',
      image: 'https://via.placeholder.com/300x200/32cd32/ffffff?text=Men+Shorts',
    },
    {
      id: 7,
      title: 'Men\'s Belt',
      price: 19.99,
      description: 'Stylish belt for every occasion.',
      image: 'https://via.placeholder.com/300x200/8a2be2/ffffff?text=Men+Belt',
    },
    {
      id: 8,
      title: 'Men\'s Cap',
      price: 15.99,
      description: 'Trendy cap for a casual look.',
      image: 'https://via.placeholder.com/300x200/ff6347/ffffff?text=Men+Cap',
    },
  ];
  
  const womenProducts = [
    // Women products data...
    {
      id: 1,
      title: 'Women\'s Dress',
      price: 59.99,
      description: 'Elegant dress for special occasions.',
      image: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=Women+Dress',
    },
    {
      id: 2,
      title: 'Women\'s Blouse',
      price: 39.99,
      description: 'Chic blouse for casual or formal wear.',
      image: 'https://via.placeholder.com/300x200/ff1493/ffffff?text=Women+Blouse',
    },
    {
      id: 3,
      title: 'Women\'s Skirt',
      price: 49.99,
      description: 'Stylish skirt that pairs well with any top.',
      image: 'https://via.placeholder.com/300x200/9370db/ffffff?text=Women+Skirt',
    },
    {
      id: 4,
      title: 'Women\'s Sandals',
      price: 29.99,
      description: 'Comfortable sandals for summer.',
      image: 'https://via.placeholder.com/300x200/ffb6c1/ffffff?text=Women+Sandals',
    },
    {
      id: 5,
      title: 'Women\'s Bag',
      price: 89.99,
      description: 'Stylish handbag for daily use.',
      image: 'https://via.placeholder.com/300x200/9370db/ffffff?text=Women+Handbag',
    },
    {
      id: 6,
      title: 'Women\'s Jacket',
      price: 79.99,
      description: 'Warm jacket for cold weather.',
      image: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=Women+Jacket',
    },
    {
      id: 7,
      title: 'Women\'s Scarf',
      price: 19.99,
      description: 'Fashionable scarf for any outfit.',
      image: 'https://via.placeholder.com/300x200/ff6347/ffffff?text=Women+Scarf',
    },
    {
      id: 8,
      title: 'Women\'s Shades',
      price: 25.99,
      description: 'Stylish sunglasses for sunny days.',
      image: 'https://via.placeholder.com/300x200/ffa500/ffffff?text=Women+Sunglasses',
    },
  ];
  
  const kidsProducts = [
    // Kids products data...
    {
      id: 1,
      title: 'Kid\'s T-Shirt',
      price: 19.99,
      description: 'Fun and colorful t-shirt for kids.',
      image: 'https://via.placeholder.com/300x200/ffa500/ffffff?text=Kids+T-Shirt',
    },
    {
      id: 2,
      title: 'Kid\'s Shorts',
      price: 24.99,
      description: 'Comfortable shorts for active kids.',
      image: 'https://via.placeholder.com/300x200/adff2f/ffffff?text=Kids+Shorts',
    },
    {
      id: 3,
      title: 'Kid\'s Sweatshirt',
      price: 34.99,
      description: 'Warm and cozy sweatshirt for chilly days.',
      image: 'https://via.placeholder.com/300x200/00ced1/ffffff?text=Kids+Sweatshirt',
    },
    {
      id: 4,
      title: 'Kid\'s Sneakers',
      price: 39.99,
      description: 'Stylish sneakers for kids.',
      image: 'https://via.placeholder.com/300x200/ff4500/ffffff?text=Kids+Sneakers',
    },
    {
      id: 5,
      title: 'Kid\'s Jacket',
      price: 49.99,
      description: 'Warm jacket for kids.',
      image: 'https://via.placeholder.com/300x200/4682b4/ffffff?text=Kids+Jacket',
    },
    {
      id: 6,
      title: 'Kid\'s Backpack',
      price: 29.99,
      description: 'Colorful backpack for school.',
      image: 'https://via.placeholder.com/300x200/ff69b4/ffffff?text=Kids+Backpack',
    },
    {
      id: 7,
      title: 'Kid\'s Cap',
      price: 15.99,
      description: 'Fun cap for sunny days.',
      image: 'https://via.placeholder.com/300x200/8b4513/ffffff?text=Kids+Cap',
    },
    {
      id: 8,
      title: 'Kid\'s Pajamas',
      price: 34.99,
      description: 'Soft pajamas for a good night sleep.',
      image: 'https://via.placeholder.com/300x200/ffb6c1/ffffff?text=Kids+Pajamas',
    },
    
  ];

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    setCart([...cart, product]); // Add product to cart
    setModalVisible(true); // Show cart modal
  };

  // Function to remove a product from the cart
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart); // Update cart state
  };

  // Calculate total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Change the current product category
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  // Get products based on the selected category
  const getCurrentProducts = () => {
    switch (currentCategory) {
      case 'men':
        return menProducts;
      case 'women':
        return womenProducts;
      case 'kids':
        return kidsProducts;
      default:
        return womenProducts; // Default to women's products
    }
  };

  // Filter products based on the search query
  const filteredProducts = getCurrentProducts().filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle checkout process
  const handleCheckout = () => {
    setPaymentModalVisible(true); // Show payment modal
    setModalVisible(false); // Hide cart modal
  };

  // Toggle visibility of the cart modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Toggle visibility of the payment modal
  const togglePaymentModal = () => {
    setPaymentModalVisible(!isPaymentModalVisible);
  };

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true); // Update authentication state
  };

  // Handle selected payment method during checkout
  const handlePaymentMethodSelect = (method) => {
    Alert.alert('Congratulations', `Order being processed by selected method: ${method}`, [
      {
        text: 'OK',
        onPress: () => {
          setCart([]); // Clear the cart after payment
        },
      },
    ]);
    togglePaymentModal(); // Close the payment modal
  };

  return (
    <View style={styles.container}>
      {/* Show authentication screen if not authenticated */}
      {!isAuthenticated ? (
        <AuthScreen onLogin={handleLogin} />
      ) : (
        <>
          <View style={styles.navbar}>
            <Text style={styles.navbarTitle}>UZ Marketplace</Text>
            <View style={styles.navbarLinks}>
              {/* Category buttons */}
              <TouchableOpacity
                style={[styles.navbarLink, currentCategory === 'men' && styles.activeLink]}
                onPress={() => handleCategoryChange('men')}
              >
                <Text style={styles.navbarLinkText}>Men</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.navbarLink, currentCategory === 'women' && styles.activeLink]}
                onPress={() => handleCategoryChange('women')}
              >
                <Text style={styles.navbarLinkText}>Women</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.navbarLink, currentCategory === 'kids' && styles.activeLink]}
                onPress={() => handleCategoryChange('kids')}
              >
                <Text style={styles.navbarLinkText}>Kids</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search input for filtering products */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {currentCategory === 'men'
                  ? 'Men\'s Products'
                  : currentCategory === 'women'
                  ? 'Women\'s Products'
                  : 'Kid\'s Products'}
              </Text>
              <View style={styles.cardContainer}>
                {/* Render product cards based on filtered products */}
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Cart modal for viewing and managing cart items */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Items in Cart:</Text>
                {cart.length === 0 ? (
                  <Text style={styles.modalText}>Your cart is empty.</Text>
                ) : (
                  <ScrollView style={styles.cartContainer}>
                    {cart.map((item) => (
                      <View key={item.id} style={styles.cartItemContainer}>
                        <Text style={styles.cartItemName}>{item.title}</Text>
                        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                        {/* Button to remove item from cart */}
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => handleRemoveFromCart(item.id)}
                        >
                          <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    <View style={styles.totalContainer}>
                      <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
                    </View>
                  </ScrollView>
                )}
                {/* Button to proceed to checkout */}
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
                {/* Button to continue shopping */}
                <TouchableOpacity style={styles.continueButton} onPress={toggleModal}>
                  <Text style={styles.continueButtonText}>Continue Shopping</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Payment modal for selecting payment method */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isPaymentModalVisible}
            onRequestClose={togglePaymentModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Select Payment Method:</Text>
                {/* Payment method buttons */}
                <TouchableOpacity style={styles.paymentButton} onPress={() => handlePaymentMethodSelect('Ecocash')}>
                  <Text style={styles.paymentButtonText}>Ecocash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentButton} onPress={() => handlePaymentMethodSelect('Cash')}>
                  <Text style={styles.paymentButtonText}>Cash</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.paymentButton} onPress={() => handlePaymentMethodSelect('Contact')}>
                  <Text style={styles.paymentButtonText}>Contact</Text>
                </TouchableOpacity>
                {/* Button to cancel payment selection */}
                <TouchableOpacity style={styles.continueButton} onPress={togglePaymentModal}>
                  <Text style={styles.continueButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#c00000',
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  toggleText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#007BFF',
  },
  navbar: {
    backgroundColor: '#c00000',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navbarLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navbarLink: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  activeLink: {
    backgroundColor: '#9b0000',
  },
  navbarLinkText: {
    color: '#fff',
    fontSize: 16,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  addToCart: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  cartContainer: {
    width: '100%',
    maxHeight: 300, // Limit height for scrolling
    overflow: 'scroll',
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#e53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  paymentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;