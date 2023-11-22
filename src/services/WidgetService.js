const apiUrl = 'https://api.mocki.io/v2/016d11e8/product-widgets'

async function getProductWidgets() {
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const data = await response.json()
  return data
}

export default getProductWidgets
