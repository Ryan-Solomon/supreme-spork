// Constants
const productGalleryParent = document.querySelector('.product-gallery');
const priceRangeSlider = document.querySelector('#price-slider');
const priceRangeSliderTextContainer = document.querySelector(
  '.price-slider h4'
);
const categoryContainer = document.querySelector('.category-items');
const searchInput = document.querySelector('.searchbar > input');

let allProducts;

// Event Listeners
generateProducts();
searchInput.addEventListener('input', filterBasedOnSearch);
categoryContainer.addEventListener('click', (e) => filterBasedOnCategory(e));

priceRangeSlider.addEventListener('change', (e) => {
  updatePrice(e);
  filterProducts(e);
});

// Functions
async function filterBasedOnSearch(e) {
  console.log(e.target.value);
  productGalleryParent.innerHTML = '';
  await generateProducts();
  const products = Array.from(productGalleryParent.children);
  let filteredProducts;
  if (e.target.value.length < 1) {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter((p) => {
      const productText = p.querySelector('.product-details > h4');
      if (
        productText.textContent
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      ) {
        return p;
      } else {
        return;
      }
    });
    productGalleryParent.innerHTML = '';
    productGalleryParent.append(...filteredProducts);
  }
}

function filterBasedOnCategory(e) {
  const elementId = e.target.id;
  switch (elementId) {
    case 'mens':
      filterBasedOnCategoryHelper('menclothing');
      break;
    case 'womens':
      filterBasedOnCategoryHelper('womenclothing');
      break;
    case 'electronics':
      filterBasedOnCategoryHelper('electronics');
      break;
    case 'all':
      filterBasedOnCategoryHelper('all');
      break;
    case 'jewelery':
      filterBasedOnCategoryHelper('jewelery');
      break;
    default:
      console.error('messed up');
  }
}

async function filterBasedOnCategoryHelper(category) {
  productGalleryParent.innerHTML = '';
  await generateProducts();
  const products = Array.from(productGalleryParent.children);
  let filteredProducts;
  if (category === 'all') {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter((p) => {
      if (p.classList.contains(category)) {
        return p;
      }
    });
  }

  productGalleryParent.innerHTML = '';
  productGalleryParent.append(...filteredProducts);
}

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
  productGalleryParent.innerHTML = '';
  productGalleryParent.append(...filteredProducts);
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
  let products;
  if (!allProducts) {
    products = await getProducts();
    allProducts = products.slice();
  } else {
    products = allProducts.slice();
  }

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
  detailsDiv.classList.add('product-details');
  const titleElement = document.createElement('h4');
  titleElement.textContent = title;
  const priceElement = document.createElement('h4');
  priceElement.id = 'item-price';
  priceElement.textContent = price;
  detailsDiv.append(titleElement, priceElement);

  container.append(imageEle, detailsDiv);
  return container;
}
