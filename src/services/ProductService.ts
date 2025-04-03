// Function to fetch products with pagination
async function fetchProducts(pageNumber: number = 0, pageSize: number = 10): Promise<any> {
  try {
    const response = await fetch(
      `https://www.productservice.somee.com/api/Product/user?PageNumber=${pageNumber}&Size=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'accept': '*/*'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


