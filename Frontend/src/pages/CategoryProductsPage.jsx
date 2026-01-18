// URL de base de votre API Django
const YOUR_API_BASE_URL = 'http://127.0.0.1:8000/api';

function CategoryProductsPage({ setSelectedProductSlug }) {
    const { categorySlug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                setLoading(true);
                setError(null);
                setProducts([]); // Réinitialiser les produits avant un nouveau chargement

                // Assurez-vous que votre API Django a un endpoint comme /api/Products/category/<slug_categorie>/
                const response = await fetch(`${YOUR_API_BASE_URL}/Products/category/${categorySlug}`); // À ADAPTER si votre backend utilise un autre chemin
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                // Définir le nom de la catégorie à partir des données si l'API le fournit,
                // ou par défaut en formatant le slug
                if (data.length > 0 && data[0].category && data[0].category.name) {
                    setCategoryName(data[0].category.name);
                } else {
                    setCategoryName(categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' '));
                }
            } catch (error) {
                console.error(`Erreur lors de la récupération des produits pour la catégorie ${categorySlug}:`, error);
                setError("Impossible de charger les produits de cette catégorie. Veuillez réessayer plus tard.");
                setCategoryName(categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, ' '));
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categorySlug]);

    return (
        <div className="category-products-page-wrapper">
            <section className="category-products-section">
                <h2 className="section-title">Produits {categoryName}</h2>
                {loading && <p className="loading-message">Chargement des produits...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && products.length === 0 && (
                    <p className="no-products-message">Aucun produit trouvé pour cette catégorie.</p>
                )}
                {!loading && !error && products.length > 0 && (
                    <div className="product-grid-container">
                        <div className="product-grid">
                            {products.map((product) => (
                                <div key={product.slug} className="product-grid-item" onClick={() => setSelectedProductSlug(product.slug)}>
                                    <div className="product-grid-image-container">
                                        {/* Utilise product.image_url */}
                                        <img src={product.image_url || 'https://placehold.co/300x200/cccccc/ffffff?text=Image+Produit'} alt={product.name} className="product-grid-image" />
                                    </div>
                                    <div className="product-grid-content">
                                        <h3>{product.name}</h3>
                                        <p>{product.description ? product.description.substring(0, 70) + (product.description.length > 70 ? '...' : '') : 'Pas de description.'}</p>
                                        <span className="product-grid-price">{product.price || 'N/A'} Ar</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link to="/products" className="back-button">Retour aux catégories</Link>
                </div>
            </section>
        </div>
    );
}

export default CategoryProductsPage;