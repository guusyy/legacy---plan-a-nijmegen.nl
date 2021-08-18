<template>
  <div>
    <Navbar />
    <div class="pa-content-container">
      <transition name="fade" appear>
        <slot />
      </transition>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
export default {
  components: {
    Navbar,
    Footer
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none !important;
}

.pa-content-container {
  margin: 4rem 8rem;
  overflow: auto;
  height: 100%;

  @media (max-width: 40em) {

    margin: 2rem 4rem;
  }
}

.fade-enter-active {
  transition: opacity .2s ease;
}

.fade-enter {
  opacity: 0;
}

</style>
