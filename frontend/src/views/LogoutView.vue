<script setup lang="ts">
import { useAuth } from '../stores/auth'
import router from '@/router'

const authStore = useAuth()
authStore.logout()
router.push('/login')

</script>

<template>
    <div class="col-md-6 offset-md-3 mt-5">
    </div>
</template>