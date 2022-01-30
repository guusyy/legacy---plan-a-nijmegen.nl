<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">{{$page.strapi.flexwerken.Titel}}</h1>
        <p style="margin-top: 3rem;" class="rte" v-html="$page.strapi.flexwerken.Beschrijving">
        </p>
      </div>
      <div class="column swiper-holder">
        <div class="image-holder" style="margin-top: 1.6rem">
          <g-image 
            v-if="$page.strapi.flexwerken.ImageSlider" 
            :width="$page.strapi.flexwerken.ImageSlider.width"
            :src="getStrapiMedia($page.strapi.flexwerken.ImageSlider.url)" 
            :alt="$page.strapi.flexwerken.ImageSlider.alternativeText || $page.strapi.flexwerken.ImageSlider.name" 
          />
          <!-- <ClientOnly>
            <progressive-img
              v-if="$page.strapi.flexwerken.ImageSlider" 
              :src="getStrapiMedia($page.strapi.flexwerken.ImageSlider.url)" 
              :placeholder="getStrapiMedia($page.strapi.flexwerken.ImageSlider.formats.thumbnail.url)"
              :aspect-ratio="$page.strapi.flexwerken.ImageSlider.height / $page.strapi.flexwerken.ImageSlider.width"
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
    flexwerken {
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
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

export default {
  methods: {
    getStrapiMedia
  },
  metaInfo() {
    const { defaultSeo, favicon } = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo
    };

    return {
      title: this.$page.strapi.flexwerken.Titel,
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
