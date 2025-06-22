<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon name="lucide:library" class="h-8 w-8 text-blue-600" />
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Book Management</h1>
              <p class="text-gray-600">Manage your book collection</p>
            </div>
          </div>
          <BookForm ref="modalRef" title="Add Book" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(true);
</script>
