<template>
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="service-icon-svg"
  >
    <!-- Neural network layers -->
    <!-- Input layer (left) -->
    <circle cx="16" cy="24" r="3" fill="currentColor" opacity="0.15" />
    <circle cx="16" cy="24" r="3" stroke="currentColor" stroke-width="2" />
    <circle cx="16" cy="32" r="3" fill="currentColor" opacity="0.15" />
    <circle cx="16" cy="32" r="3" stroke="currentColor" stroke-width="2" />
    <circle cx="16" cy="40" r="3" fill="currentColor" opacity="0.15" />
    <circle cx="16" cy="40" r="3" stroke="currentColor" stroke-width="2" />

    <!-- Hidden layer (middle) -->
    <circle cx="32" cy="20" r="3" fill="currentColor" opacity="0.15" />
    <circle cx="32" cy="20" r="3" stroke="currentColor" stroke-width="2" />
    <circle cx="32" cy="32" r="3" fill="currentColor" />
    <circle cx="32" cy="44" r="3" fill="currentColor" opacity="0.15" />
    <circle cx="32" cy="44" r="3" stroke="currentColor" stroke-width="2" />

    <!-- Output layer (right) -->
    <circle cx="48" cy="28" r="3" fill="currentColor" opacity="0.15" />
    <circle cx="48" cy="28" r="3" stroke="currentColor" stroke-width="2" />
    <circle cx="48" cy="36" r="3" fill="currentColor" opacity="0.15" />
    <circle cx="48" cy="36" r="3" stroke="currentColor" stroke-width="2" />

    <!-- Connections -->
    <line x1="19" y1="24" x2="29" y2="20" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
    <line x1="19" y1="32" x2="29" y2="32" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
    <line x1="19" y1="40" x2="29" y2="44" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
    <line x1="35" y1="20" x2="45" y2="28" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
    <line x1="35" y1="32" x2="45" y2="28" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
    <line x1="35" y1="32" x2="45" y2="36" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
    <line x1="35" y1="44" x2="45" y2="36" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
  </svg>
</template>

<style scoped>
.service-icon-svg {
  width: 100%;
  height: 100%;
  color: rgb(213, 214, 215);
}
</style>
