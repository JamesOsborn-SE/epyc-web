<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '../stores/auth'
import router from '@/router'

const authStore = useAuth()

const username = ref("")
const password = ref("")
const isSubmitting = ref(false)
const errors = ref([])

// redirect to home if already logged in
if (!authStore.hasExpired) {
    router.push('/')
}

async function onSubmit(event: Event) {
    event.preventDefault()

    isSubmitting.value = true
    await authStore.login(username.value, password.value)
        .then(() => {
            if (!authStore.hasExpired)
                router.push('/');
        })
        .catch()
        .finally(()=>{
            isSubmitting.value = false
        })
}
</script>

<template>
    <div class="col-md-6 offset-md-3 mt-5">

        <h2>Login</h2>
        <form id="loginForm" @submit="onSubmit">
            
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input v-model="username" :required="true">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="password" type="password" :required="true" :minlength="3">
            </div>
            <div class="mb-3">
                <button class="btn btn-primary" type="submit" value="submit" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
                    Login
                </button>
            </div>
            <p v-if="errors.values.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
        </form>
        </div>
</template>