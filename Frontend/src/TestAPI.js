import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories, fetchServices } from './services/api';

function TestAPI() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPIs = async () => {
      try {
        console.log('Testing API connections...');
        
        // Test products
        const productsData = await fetchProducts();
        console.log('Products:', productsData);
        setProducts(productsData);
        
        // Test categories
        const categoriesData = await fetchCategories();
        console.log('Categories:', categoriesData);
        setCategories(categoriesData);
        
        // Test services
        const servicesData = await fetchServices();
        console.log('Services:', servicesData);
        setServices(servicesData);
        
        setLoading(false);
      } catch (err) {
        console.error('API Test failed:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    testAPIs();
  }, []);

  if (loading) return <div>Loading API test...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>API Test Results</h2>
      
      <h3>Products ({products.length})</h3>
      <pre>{JSON.stringify(products, null, 2)}</pre>
      
      <h3>Categories ({categories.length})</h3>
      <pre>{JSON.stringify(categories, null, 2)}</pre>
      
      <h3>Services ({services.length})</h3>
      <pre>{JSON.stringify(services, null, 2)}</pre>
    </div>
  );
}

export default TestAPI;