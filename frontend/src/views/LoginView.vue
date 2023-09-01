<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '../stores/auth'
import router from '@/router'
import { useRoute } from 'vue-router';

const authStore = useAuth()

const username = ref("")
const password = ref("")
const isSubmitting = ref(false)
const errors = ref([])

const route = useRoute()
const code = route.query["code"]


// redirect to home if already logged in
if (!code && !authStore.hasExpired) {
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
        .finally(() => {
            isSubmitting.value = false
        })
}
onMounted(() => {
    if (code) {
        authStore.getAuthFromCode(code).then((path: string) => {
            router.push(path)
        })
    }
})
</script>

<template>
    <Suspense>
        <template #default>
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
        <template #fallback> Loading... </template>
    </Suspense>
</template>