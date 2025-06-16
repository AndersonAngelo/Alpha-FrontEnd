<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const product = ref({
  title: '',
  price: '',
  description: '',
  image: ''
})

const loading = ref(false)



const createProduct = async () => {
  loading.value = true

  try {
    await api.post('/products', product.value)
    alert('Produto cadastrado com sucesso!')
    router.push('/')
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err)
    alert('Erro ao cadastrar produto')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-100 to-cyan-900 flex items-center justify-center px-4">
    <div class="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl">
      <button @click="router.back()" type="button"
        class="text-cyan-800 hover:text-cyan-600 font-medium flex items-center gap-1 transition">
        ← Voltar
      </button>
      <h1 class="text-3xl font-bold text-cyan-900 mb-6 text-center">Cadastrar Produto</h1>

      <form @submit.prevent="createProduct" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-cyan-800 mb-1">Título</label>
          <input v-model="product.title"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            placeholder="Digite o título do produto" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-cyan-800 mb-1">Preço</label>
          <input type="number" v-model="product.price"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            placeholder="Digite o preço" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-cyan-800 mb-1">Código de barras</label>
          <input type="number" value="1234567891234"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition resize-none"
            rows="4" placeholder="Insira código de barras do produto"></input>
        </div>
        <div>
          <label class="block text-sm font-semibold text-cyan-800 mb-1">Imagem (URL)</label>
          <input v-model="product.image"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            placeholder="https://exemplo.com/imagem.jpg" />
        </div>
        <div class="text-center">
          <button type="submit"
            class="bg-cyan-800 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-md transition-shadow shadow-md hover:shadow-lg"
            :disabled="loading">
            ➕ Cadastrar Produto
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
