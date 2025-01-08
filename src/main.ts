import './style.css'
import { PRODUCTS } from './data/products'
import { Product } from './types/product';

const wrapper = document.getElementById('wrapper')
const titlesElements = document.querySelectorAll('div.title')
let sortedTypes = 'none'

const removeAllProducts = (): void => {
  if (!wrapper) return

  const children = wrapper.children

  if (children.length === 0) return

  let i = children.length - 1

  while (i >= 3) {
    wrapper?.removeChild(children[i])
    i--
  }
}

const renderProducts = (products: Product[]): void => {
  if (!wrapper) return

  if (products.length === 0) {
    wrapper.innerHTML = '<h2>No hay productos</h2>'
  } else {
    removeAllProducts()
  }

  products.forEach((product) => {
    const nameDiv = document.createElement('div')
    const typeDiv = document.createElement('div')
    const priceDiv = document.createElement('div')
    
    nameDiv.innerHTML = `<p>${product.name}</p>`
    typeDiv.innerHTML = `<p>${product.type}</p>`
    priceDiv.innerHTML = `<p>${product.price} $</p>`
  
    wrapper?.appendChild(nameDiv)
    wrapper?.appendChild(typeDiv)
    wrapper?.appendChild(priceDiv)
  })
}

let sortBy = (classification: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    let newProducts = [...PRODUCTS]

    if (classification === 'name') {
      if (sortedTypes === 'first') {
        newProducts = newProducts.sort((a, b) => b.name.localeCompare(a.name))
        sortedTypes = 'second'
      } else {
        newProducts = newProducts.sort((a, b) => a.name.localeCompare(b.name))
        sortedTypes = 'first'
      }
    }
    
    if (classification === 'type') {
      if (sortedTypes === 'first') {
        newProducts = newProducts.sort((a, b) => b.type.localeCompare(a.type))
        sortedTypes = 'second'
      } else {
        newProducts = newProducts.sort((a, b) => a.type.localeCompare(b.type))
        sortedTypes = 'first'
      }
    }
    
    if (classification === 'price') {
      if (sortedTypes === 'first') {
        newProducts = newProducts.sort((a, b) => b.price - a.price)
        sortedTypes = 'second'
      } else {
        newProducts = newProducts.sort((a, b) => a.price - b.price)
        sortedTypes = 'first'
      }
    }

    resolve(newProducts)
  })
}

titlesElements.forEach((title) => {
  title.addEventListener('click', () => {
    const h3Element = title.children[0] as HTMLElement
    
    switch (h3Element.innerText) {
      case 'Nombre':
        sortBy('name').then(newProducts => renderProducts(newProducts))
        break
      case 'Tipo':
        sortBy('type').then(newProducts => renderProducts(newProducts))
        break
      case 'Precio':
        sortBy('price').then(newProducts => renderProducts(newProducts))
        break
      default:
        break
    }
  })
})





renderProducts(PRODUCTS)