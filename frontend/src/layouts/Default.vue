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
  margin: 4rem 6rem 4rem 9rem;
  height: 100%;

  @media (max-width: 40em) {

    margin: 0 3.5rem 4rem 6.5rem;
  }

  @media (max-width: 64em) {
    margin: 0 3.5rem 4rem 6.5rem;
  }
}

.fade-enter-active {
  transition: opacity .4s ease;
}

.fade-enter {
  opacity: 0;
}

</style>
