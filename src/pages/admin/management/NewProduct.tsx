import {useState, ChangeEvent, FormEvent, useEffect} from "react";
import Sidebar from "../../../components/Sidebar.tsx";
import '../../../styles/products.scss';
import {Product} from "../../../models/Product.ts";
import {Category} from "../../../models/Category.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import toast from "react-hot-toast";

const NewProduct = () => {
  const sellerId = useAppSelector((state) => state.authReducer.username);
  const [imageLink, setImageLink] = useState('');

  const [product, setProduct] = useState<Product>({
    productName: "",
    supplierCode: "",
    images: [],
    price: 0,
    description: "",
    categories: [],
    discountPercentage: 0,
    sellerId: sellerId,
    active: true
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.productservice.somee.com/api/Category');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        throw new Error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setProduct(prev => ({
      ...prev,
      categories: selectedOptions
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imagePromises = Array.from(files).map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then(imageUrls => {
        setImagePreview(imageUrls);
        setProduct(prev => ({
          ...prev,
          images: imageUrls
        }));
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Add your API call here to save the product
      console.log('Product to submit:', product);
      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const resetForm = () => {
    setProduct({
      productName: "",
      supplierCode: "",
      images: [],
      price: 0,
      description: "",
      categories: [],
      discountPercentage: 0,
      sellerId: sellerId,
      active: true
    });
    setImagePreview([]);
    setImageLink('');
  };

  const handleAddImageLink = () => {
    if (!imageLink) {
      toast.error('Please enter an image URL');
      return;
    }

    if (!imageLink.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
      toast.error('Please enter a valid image URL');
      return;
    }

    setProduct(prev => ({
      ...prev,
      images: [...prev.images, imageLink]
    }));
    setImageLink(''); // Clear the input after adding
  };

  // Function to remove image link
  const handleRemoveImage = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };


  return (
      <div className="admin_container">
        <Sidebar/>
        <main className="product_management">
          <article>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={product.productName}
                    onChange={handleInputChange}
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="supplierCode">Supplier Code</label>
                <input
                    type="text"
                    id="supplierCode"
                    name="supplierCode"
                    value={product.supplierCode}
                    onChange={handleInputChange}
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountPercentage">Discount (%)</label>
                <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={product.discountPercentage}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="categories">Categories</label>
                <select
                    id="categories"
                    name="categories"
                    multiple
                    value={product.categories}
                    onChange={handleCategoryChange}
                    required
                    className="form-select"
                >
                  {categories.length === 0 ? (
                      <option disabled>No categories available</option>
                  ) : (
                      categories.map((category) => (
                          <option key={category.id} value={category.categoryName}>
                            {category.categoryName}
                          </option>
                      ))
                  )}
                </select>
              </div>
              <div className="form-group">
                <label>Product Images</label>
                <div className="flex gap-2">
                  <input
                      type="url"
                      value={imageLink}
                      onChange={(e) => setImageLink(e.target.value)}
                      placeholder="Enter image URL"
                      className="form-input flex-1"
                  />
                  <button
                      type="button"
                      onClick={handleAddImageLink}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add Image
                  </button>
                </div>

                {/* Image Preview Section */}
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {product.images.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                            src={url}
                            alt={`Product ${index + 1}`}
                            className="w-full h-32 object-cover rounded"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                  ))}
                </div>
              </div>

              <div className="btn-group">
                <button type="submit" className="create-btn">
                  Create Product
                </button>
                <button type="button" onClick={resetForm} className="reset-btn">
                  Reset
                </button>
              </div>
            </form>
          </article>
        </main>
      </div>
  );
};

export default NewProduct;