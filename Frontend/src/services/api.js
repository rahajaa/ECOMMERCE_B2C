// Configuration API B2C
const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000/api',
  
  // Endpoints B2C
  ENDPOINTS: {
    PRODUCTS: '/products/',
    PRODUCT_DETAIL: (id) => `/products/${id}/`,
    CART: '/cart/',
    ORDERS: '/orders/',
    USERS: '/users/',
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
  },
  
  // Headers par défaut
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` })
    };
  },
  
  // Méthodes CRUD
  async get(endpoint) {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      headers: this.getHeaders()
    });
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export default API_CONFIG;
