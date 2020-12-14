// Constants
const productGalleryParent = document.querySelector('.product-gallery');

// Event Listeners
generateProducts();

// Functions

async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e.message);
    return 'There was an error';
  }
}

async function generateProducts() {
  const products = await getProducts();
  if (typeof products === 'string') return;

  const productFragment = document.createDocumentFragment();
  products.forEach((product) => {
    let newProduct = createProduct(product);
    productFragment.append(newProduct);
  });
  productGalleryParent.append(productFragment);
}

function createProduct(product) {
  const { image, price, title, category } = product;
  // Create Elements
  const container = document.createElement('div');
  container.classList.add(`product ${category}`);
  const imageEle = document.createElement('img');
  imageEle.src = image;
  imageEle.alt = title;
  const detailsDiv = document.createElement('div');
  const titleElement = document.createElement('h4');
  titleElement.textContent = title;
  const priceElement = document.createElement('h4');
  priceElement.textContent = price;
  detailsDiv.append(titleElement, priceElement);

  container.append(imageEle, detailsDiv);

  return container;
}
