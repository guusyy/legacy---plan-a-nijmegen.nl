<template>
  <Layout>
    <div class="pa-container">
      <h2>Oeps... deze pagina is niet gevonden</h2>
      <h3>Nu je hier toch bent, heb je al ons mooie <a href="/bar-restaurant/" style="text-decoration:underline;">Restaurant</a> gezien?</h3>
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
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

export default {
  components: {
  },
  metaInfo() {
    const { seo } = this.$page.strapi.homepage;
    const { defaultSeo, favicon } = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo,
      ...seo,
    };

    return {
      title: fullSeo.metaTitle,
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: "favicon",
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
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