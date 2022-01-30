<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">{{$page.strapi.barRestaurant.Titel}}</h1>
        <p style="margin-top: 3rem;" class="rte">
          <VueMarkdown :source="$page.strapi.barRestaurant.Beschrijving" />
        </p>
      </div>
      <div class="column swiper-holder">
        <div class="image-holder" style="margin-top: 1.6rem">
          <swiper
            :slides-per-view="3"
            :space-between="50"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide>
              <g-image v-if="$page.strapi.barRestaurant.ImageSlider" :src="getStrapiMedia($page.strapi.barRestaurant.ImageSlider.url)" :alt="$page.strapi.barRestaurant.ImageSlider.alternativeText || $page.strapi.barRestaurant.ImageSlider.name" />
            </swiper-slide>
            <swiper-slide>
              <g-image v-if="$page.strapi.barRestaurant.ImageSlider" :src="getStrapiMedia($page.strapi.barRestaurant.ImageSlider.url)" :alt="$page.strapi.barRestaurant.ImageSlider.alternativeText || $page.strapi.barRestaurant.ImageSlider.name" />
            </swiper-slide>
            <swiper-slide>
              <g-image v-if="$page.strapi.barRestaurant.ImageSlider" :src="getStrapiMedia($page.strapi.barRestaurant.ImageSlider.url)" :alt="$page.strapi.barRestaurant.ImageSlider.alternativeText || $page.strapi.barRestaurant.ImageSlider.name" />
            </swiper-slide>
          </swiper>
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

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper.scss'

// import anime from 'animejs/lib/anime.es.js';

export default {
  components: {
    Articles,
    Swiper,
    SwiperSlide,
    VueMarkdown
  },
  // directives: {
  //   swiper: directive
  // },
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
      title: this.$page.strapi.barRestaurant.Titel,
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
