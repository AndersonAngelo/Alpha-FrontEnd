<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'


const products = ref([])
const route = useRoute()
const searchTerm = ref('')
const router = useRouter()

const sortOrder = ref('asc')


onMounted(async () => {
  try {
    const res = await api.get('/products')
    products.value = res.data
  } catch (err) {
    console.error('Erro ao buscar produtos:', err)
  }
})

const filteredProducts = computed(() => {
  const filtered = products.value.filter(product => {
    const barcode = product.barcode ?? '1234567891234'
    const search = searchTerm.value.toLowerCase()
    return (
      product.title.toLowerCase().includes(search) ||
      barcode.includes(search)
    )
  })

  return filtered.sort((a, b) =>
    sortOrder.value === 'asc'
      ? a.price - b.price
      : b.price - a.price
  )
})

const goToEditPage = (id) => {
  router.push(`/edit/${id}`)
}

</script>

<template>
  <div class="w-full bg-gradient-to-br from-cyan-900 via-blue-100 to-cyan-900 min-h-screen an">
    <header class="grid grid-cols-2 items-center justify-between px-20 py-20">
      <h1 class="text-3xl font-bold text-white">Alpha</h1>
      <button @click="router.push('/registrate')"
        class="bg-white text-cyan-900 font-semibold px-4 py-2 w-52 justify-self-end rounded-sm shadow hover:bg-gray-100 transition">
        ➕ Novo Produto
      </button>

    </header>

    <main class="flex justify-center">
      <div class="p-4 w-full max-w-7xl">
        <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 class="text-3xl font-semibold text-gray-800">Lista de Produtos</h1>
          <div class="flex items-center gap-4">
            <select v-model="sortOrder"
              class="grid grid-cols-2 px-4 py-2 border-0 border-b-2 border-gray-400 rounded-sm shadow focus:outline-none focus:ring-2 focus:ring-cyan-700 text-gray-700 text-sm hover:cursor-pointer transition duration-200">
              <option value="asc">🔼 Menor preço</option>
              <option value="desc">🔽 Maior preço</option>
            </select>

            <input
              class="w-80 max-w-xs border-0 border-b-2 border-gray-400 focus:border-cyan-800 focus:outline-none transition duration-300 px-2 py-1 placeholder-gray-400"
              type="text" v-model="searchTerm" placeholder="Buscar por título ou código de barras..." />
          </div>
        </div>
        <div
          class="grid grid-cols-4 border border-gray-300 rounded bg-cyan-950 text-gray-300 text-center py-3 px-16 mb-6 font-semibold shadow-xl">
          <h3>Imagem</h3>
          <h3>Nome</h3>
          <h3>Preço</h3>
          <h3>Cod. Barras</h3>
        </div>
        <div v-for="product in filteredProducts" :key="product.id" @click="goToEditPage(product.id)" class=" grid grid-cols-4 items-center mb-1 border border-gray-300 rounded bg-white px-16 py-4 text-center
          hover:opacity-70 transition duration-300 cursor-pointer shadow-xl">
          <img :src="product.image" alt="product image" class="w-20 h-24 object-contain mx-auto" />
          <p class="w-64">{{ product.title }}</p>
          <p>R$ {{ product.price.toFixed(2) }}</p>
          <p>{{ product.barcode ?? '1234567891234' }}</p>
        </div>
      </div>
    </main>
  </div>
</template>
