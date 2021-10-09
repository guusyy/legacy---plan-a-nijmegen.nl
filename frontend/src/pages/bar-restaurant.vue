<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">{{$page.strapi.barRestaurant.Titel}}</h1>
        <p style="margin-top: 3rem;">
          <VueMarkdown :source="$page.strapi.barRestaurant.Beschrijving" />
        </p>
      </div>
      <div class="column swiper-holder">
        <div class="image-holder">
          <progressive-img
            v-if="$page.strapi.barRestaurant.ImageSlider" 
            :src="getStrapiMedia($page.strapi.barRestaurant.ImageSlider.url)" 
            :placeholder="getStrapiMedia($page.strapi.barRestaurant.ImageSlider.formats.thumbnail.url)"
            :aspect-ratio="$page.strapi.barRestaurant.ImageSlider.height / $page.strapi.barRestaurant.ImageSlider.width"
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
    barRestaurant {
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
import Articles from "~/components/Articles";
import VueMarkdown from "vue-markdown";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper.scss'

// import anime from 'animejs/lib/anime.es.js';

export default {
  components: {
    Articles,
    Swiper,
    SwiperSlide,
    VueMarkdown
  },
  directives: {
    swiper: directive
  },
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
