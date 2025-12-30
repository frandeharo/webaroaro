<template>
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="service-icon-svg"
  >
    <!-- Gear body -->
    <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.15" />
    <circle cx="32" cy="32" r="10" stroke="currentColor" stroke-width="2" />
    <circle cx="32" cy="32" r="4" fill="currentColor" />

    <!-- Gear teeth (8 rectangles around) -->
    <rect x="30" y="14" width="4" height="6" rx="1" fill="currentColor" />
    <rect x="30" y="44" width="4" height="6" rx="1" fill="currentColor" />
    <rect x="14" y="30" width="6" height="4" rx="1" fill="currentColor" />
    <rect x="44" y="30" width="6" height="4" rx="1" fill="currentColor" />

    <!-- Diagonal teeth -->
    <rect
      x="21"
      y="17"
      width="4"
      height="5"
      rx="1"
      fill="currentColor"
      transform="rotate(45 23 19.5)"
    />
    <rect
      x="39"
      y="17"
      width="4"
      height="5"
      rx="1"
      fill="currentColor"
      transform="rotate(-45 41 19.5)"
    />
    <rect
      x="21"
      y="42"
      width="4"
      height="5"
      rx="1"
      fill="currentColor"
      transform="rotate(-45 23 44.5)"
    />
    <rect
      x="39"
      y="42"
      width="4"
      height="5"
      rx="1"
      fill="currentColor"
      transform="rotate(45 41 44.5)"
    />
  </svg>
</template>

<style scoped>
.service-icon-svg {
  width: 100%;
  height: 100%;
  color: rgb(213, 214, 215);
}
</style>
