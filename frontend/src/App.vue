<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from './stores/auth';
const userStore = useAuth()
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/game/new">New</RouterLink>
        <RouterLink to="/game/old">Old</RouterLink>
        <RouterLink v-if="!userStore.isAuthenticated" to="/login">Login</RouterLink>
        <RouterLink v-if="userStore.isAuthenticated" to="/logout">Logout {{ userStore.username }}</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
