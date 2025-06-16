<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const productId = route.params.id
const product = ref(null)
const loading = ref(true)


onMounted(async () => {
  try {
    const res = await api.get(`/products/${productId}`)
    product.value = res.data
  } catch (err) {
    console.error('Erro ao buscar produto:', err)
  } finally {
    loading.value = false
  }
})



const deleteProduct = async () => {
  const confirmar = confirm('Tem certeza que deseja excluir este produto?')
  if (!confirmar) return

  try {
    await api.delete(`/products/${productId}`)
    alert('Produto excluído com sucesso!')
    router.push('/')
  } catch (err) {
    console.error('Erro ao excluir produto:', err)
    alert('Erro ao excluir produto')
  }
}

const updateProduct = async () => {
  
  try {
    await api.put(`/products/${productId}`, product.value)
    console.log(product.value)
    alert('Produto atualizado com sucesso!')
  } catch (err) {
    console.error('Erro ao atualizar produto:', err)
    alert('Erro ao atualizar produto')
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

      <h1 class="text-3xl font-bold text-cyan-900 mb-6 text-center">Editar Produto</h1>

      <div v-if="loading" class="text-center text-gray-500">Carregando produto...</div>

      <form v-else @submit.prevent="updateProduct" class="space-y-6">
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
            class="bg-cyan-800 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-md transition-shadow shadow-md hover:shadow-lg">
            💾 Salvar Alterações
          </button>
          <div class="text-center mt-4">
            <button @click="deleteProduct"
              class="bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-md transition-shadow shadow-md hover:shadow-lg">
              🗑️ Excluir Produto
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
