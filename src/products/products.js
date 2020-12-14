// Constants
const productGalleryParent = document.querySelector('.product-gallery');

// Event Listeners

// Functions

async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
}

getProducts();
