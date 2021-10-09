<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">{{$page.strapi.overOn.Titel}}</h1>
        <p style="margin-top: 3rem;">
          <VueMarkdown :source="$page.strapi.overOn.Beschrijving" />
        </p>
      </div>
      <div class="column swiper-holder">
        <div class="image-holder">
          <progressive-img
            v-if="$page.strapi.overOn.ImageSlider" 
            :src="getStrapiMedia($page.strapi.overOn.ImageSlider.url)" 
            :placeholder="getStrapiMedia($page.strapi.overOn.ImageSlider.formats.thumbnail.url)"
            :aspect-ratio="$page.strapi.overOn.ImageSlider.height / $page.strapi.overOn.ImageSlider.width"
            :alt="$page.strapi.overOn.ImageSlider.alternativeText || $page.strapi.overOn.ImageSlider.name"
          />
        </div>
      </div>
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
    overOn {
      Titel
      Beschrijving
      ImageSlider{
        width
        height
        alternativeText
        name
        url
        formats
      }
    }
  }
}
</page-query>

<script>
import VueMarkdown from "vue-markdown";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

export default {
  components: {
    VueMarkdown
  },
  methods: {
    getStrapiMedia
  },
  metaInfo() {
    const { defaultSeo, favicon } = this.$page.strapi.global;

    const fullSeo = {
      ...defaultSeo
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

.container {
  display: grid;
  max-width: 100%;
  grid-template-columns: calc(40% - 1rem) calc(60% - 1rem);
  gap: 2rem;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    grid-template-row: repeat(2, 1fr);
  }
}

.swiper-holder {
  display: flex;
  justify-content: center;

  .image-holder {
    width: 90%;
  }
}
</style>
