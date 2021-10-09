<template>
  <Layout>
    <div class="pa-container">
      <h2>Oeps... deze pagina is niet gevonden</h2>
      <h3>Nu je hier toch bent, heb je al ons mooie <g-link to="/bar-restaurant/" style="text-decoration:underline;">Restaurant</g-link> gezien?</h3>
    </div>
  </Layout>
</template>

<page-query>
query {
  strapi {
    global {
      siteName
      favicon {
        url
      }
      defaultSeo {
        metaTitle
        metaDescription
        shareImage {
          url
        }
      }
    }
  }
}
</page-query>

<script>

export default {
  components: {
  }
};
</script>

<style lang="scss" scoped>

.pa-container {
  min-height: 80vh;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;

  & h2 {
    font-size: 4.8rem;
    line-height: 6rem;
  }
}

</style>