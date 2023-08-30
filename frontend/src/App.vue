<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from './stores/auth';
const userStore = useAuth()
</script>

<template>
  <header>
    <div>
      <h1>Eat Poop You Cat</h1>
      <p> you are logged in as {{ userStore.username }}</p>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
        <RouterLink to="/game/new">New Game</RouterLink>
        <RouterLink to="/game/old">Old Games</RouterLink>
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
  margin-top: 2rem;
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
