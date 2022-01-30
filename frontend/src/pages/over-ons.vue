<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">{{$page.strapi.overOn.Titel}}</h1>
        <p style="margin-top: 3rem;" class="rte">
          <!-- <VueMarkdown :source="$page.strapi.overOn.Beschrijving" /> -->
        </p>
      </div>
      <div class="column swiper-holder">
        <div class="image-holder" style="margin-top: 1.6rem">
          <g-image v-if="$page.strapi.overOn.ImageSlider" blur="100" :src="getStrapiMedia($page.strapi.overOn.ImageSlider.url)" :alt="$page.strapi.overOn.ImageSlider.alternativeText || $page.strapi.overOn.ImageSlider.name" />
          <!-- <ClientOnly>
            <progressive-img
              v-if="$page.strapi.overOn.ImageSlider" 
              :src="getStrapiMedia($page.strapi.overOn.ImageSlider.url)" 
              :placeholder="getStrapiMedia($page.strapi.overOn.ImageSlider.formats.thumbnail.url)"
              :aspect-ratio="$page.strapi.overOn.ImageSlider.height / $page.strapi.overOn.ImageSlider.width"
              :alt="$page.strapi.overOn.ImageSlider.alternativeText || $page.strapi.overOn.ImageSlider.name"
            />
          </ClientOnly> -->
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
      title: this.$page.strapi.overOn.Titel,
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
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }
}

.swiper-holder {
  display: flex;
  justify-content: flex-end;

  .image-holder {
    width: 90%;

    & img {
      min-width: 100%;
    }

    @media (max-width: 64em) {
      width: 100%;
    }
  }
}
</style>
