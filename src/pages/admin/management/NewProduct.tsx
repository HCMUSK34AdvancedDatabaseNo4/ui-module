import { useState, ChangeEvent, FormEvent } from "react";
import Sidebar from "../../../components/Sidebar.tsx";
import '../../../styles/products.scss';
import {Product} from "../../../models/Product.ts";

const NewProduct = () => {
  const [product, setProduct] = useState<Product>({
    productName: "",
    supplierCode: "",
    images: [],
    price: 0,
    description: "",
    categories: [],
    discountPercentage: 0
  });

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
  // 5896e205fae346cfa947576454bce7f1
  // 67eec6cb9b15201e7427d7e0
  const resetForm = () => {
    setProduct({
      productName: "",
      supplierCode: "",
      images: [],
      price: 0,
      description: "",
      categories: [],
      discountPercentage: 0
    });
    setImagePreview([]);
  };

  return (
    <div className="admin_container">
      <Sidebar />
      <main className="product_management">
        <article className="content-center">
          <form onSubmit={handleSubmit}>
            <h2>New Product</h2>
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
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="food">Food</option>
                {/* Add more categories as needed */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="images">Product Images</label>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
              />
              <div className="image-preview">
                {imagePreview.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Preview ${index + 1}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                  />
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