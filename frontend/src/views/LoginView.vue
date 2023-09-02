<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useAuth } from '../stores/auth'
import router from '@/router'
import { useRoute } from 'vue-router';
import PencilSpinner from '@/components/PencilSpinner.vue';

const authStore = useAuth()

const state = reactive({
    username: "",
    password: "",
    isSubmitting: false,
    isLoading: true,
})

const route = useRoute()
const code = route.query["code"]

// redirect to home if already logged in
if (!code && !authStore.hasExpired) {
    router.push('/')
}

async function onSubmit(event: Event) {
    event.preventDefault()

    state.isSubmitting = true
    await authStore.login(state.username, state.password)
        .then(() => {
            if (!authStore.hasExpired)
                router.push('/');
        })
        .catch()
        .finally(() => {
            state.isSubmitting = false
        })
}
onMounted(() => {
    if (code) {
        new Promise(resolve => setTimeout(resolve, 5000));
        authStore.getAuthFromCode(code).then((path: string) => {
            router.push(path)
        }).finally(() => {
            state.isLoading = false
        })
    } else {
        state.isLoading = false
    }
})
</script>

<template>
    <div class="col-md-6 offset-md-3 mt-5">
        <PencilSpinner :show="state.isLoading"/>
        <h2>Login</h2>
        <form id="loginForm" @submit="onSubmit">
            <div class="mb-3">
                <label class="form-label">Username</label>
                <input v-model="state.username" :required="true">
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="state.password" type="password" :required="true" :minlength="3">
            </div>
            <div class="mb-3">
                <button class="btn btn-primary" type="submit" value="submit" :disabled="state.isSubmitting">
                    <span v-show="state.isSubmitting" class="spinner-border spinner-border-sm me-1"></span>
                    Login
                </button>
            </div>
        </form>
    </div>
</template>