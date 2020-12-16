// Constants
const productGalleryParent = document.querySelector('.product-gallery');
const priceRangeSlider = document.querySelector('#price-slider');
const priceRangeSliderTextContainer = document.querySelector(
  '.price-slider h4'
);

// Event Listeners
generateProducts();

priceRangeSlider.addEventListener('change', (e) => {
  updatePrice(e);
  filterProducts(e);
});

// Functions

async function filterProducts(e) {
  productGalleryParent.innerHTML = '';
  await generateProducts();
  const products = Array.from(productGalleryParent.children);
  const filteredProducts = products.filter((p) => {
    const priceDiv = p.querySelector('#item-price');
    const price = priceDiv.textContent;
    if (parseInt(price) <= parseInt(e.target.value)) {
      return p;
    }
  });
  productGalleryParent.append(...filteredProducts);
  console.log(filteredProducts);
}

function updatePrice(e) {
  priceRangeSliderTextContainer.textContent = `Price: $${e.target.value}`;
}

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
  container.classList.add(['product'], [`${category.split(' ').join('')}`]);
  const imageEle = document.createElement('img');
  imageEle.src = image;
  imageEle.alt = title;
  const detailsDiv = document.createElement('div');
  const titleElement = document.createElement('h4');
  titleElement.textContent = title;
  const priceElement = document.createElement('h4');
  priceElement.id = 'item-price';
  priceElement.textContent = price;
  detailsDiv.append(titleElement, priceElement);

  container.append(imageEle, detailsDiv);
  return container;
}
