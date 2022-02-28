<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">{{$page.strapi.overOn.Titel}}</h1>
        <VueMarkdown style="margin-top: 3rem;" class="rte" :source="$page.strapi.overOn.Beschrijving" />
      </div>
      <div class="column swiper-holder">
        <div class="image-holder" style="margin-top: 1.6rem">
          <img 
            class="img-lazy"
            v-if="$page.strapi.overOn.ImageSlider.length < 2"
            v-lazy="getStrapiMedia($page.strapi.overOn.ImageSlider[0].url)" 
            :alt="$page.strapi.overOn.ImageSlider[0].alternativeText || $page.strapi.overOn.ImageSlider[0].name" 
            :style="`aspect-ratio: ${$page.strapi.overOn.ImageSlider[0].width}/${$page.strapi.overOn.ImageSlider[0].height}`"
            :width="$page.strapi.overOn.ImageSlider[0].width"
            :height="$page.strapi.overOn.ImageSlider[0].height"
          />
          <swiper
            v-else
            :options="swiperOptions"
            :style="`aspect-ratio: ${$page.strapi.overOn.ImageSlider[0].width}/${$page.strapi.overOn.ImageSlider[0].height}; height: auto;`"
            :width="$page.strapi.overOn.ImageSlider[0].width"
            :height="$page.strapi.overOn.ImageSlider[0].height"
          >
            <swiper-slide v-for="image in $page.strapi.overOn.ImageSlider" :key="image.name">
              <img
                :data-src="getStrapiMedia(image.url)"
                :data-srcset="getStrapiMedia(image.url)"
                :alt="image.alternativeText || image.name"
                class="swiper-lazy"
              />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
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

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide,
    VueMarkdown
  },
  methods: {
    getStrapiMedia
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        autoHeight: false,
        effect: 'fade',
        loop: true,
        lazy: {
          enabled: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
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
          rel: "shortcut icon favicon",
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
