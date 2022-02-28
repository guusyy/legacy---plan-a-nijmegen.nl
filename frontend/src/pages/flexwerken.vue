<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">{{$page.strapi.flexwerken.Titel}}</h1>
        <VueMarkdown style="margin-top: 3rem;" class="rte" :source="$page.strapi.flexwerken.Beschrijving" />
        <div class="nav-buttons">
          <g-link to="/membership" class="btn">
            <span>
              Word member
            </span>
            <svg class="pa-icon" viewBox="0 0 20.868 29.5">
              <path d="M1.6,29.7.4,28.1,17.933,15,.4,1.8,1.6.2,21.267,15Z" transform="translate(-0.398 -0.201)"/>
            </svg>
          </g-link>
          <g-link to="/ruimte-huren" class="btn">
            <span>
              Ruimte huren
            </span>
            <svg class="pa-icon" viewBox="0 0 20.868 29.5">
              <path d="M1.6,29.7.4,28.1,17.933,15,.4,1.8,1.6.2,21.267,15Z" transform="translate(-0.398 -0.201)"/>
            </svg>
          </g-link>
        </div>
      </div>
      <div class="column swiper-holder">
        <div class="image-holder" style="margin-top: 1.6rem">
          <img
            v-if="$page.strapi.flexwerken.ImageSlider.length < 2"
            v-lazy="getStrapiMedia($page.strapi.flexwerken.ImageSlider[0].url)" 
            class="img-lazy"
            :alt="$page.strapi.flexwerken.ImageSlider[0].alternativeText || $page.strapi.flexwerken.ImageSlider[0].name" 
            :style="`aspect-ratio: ${$page.strapi.flexwerken.ImageSlider[0].width}/${$page.strapi.flexwerken.ImageSlider[0].height}`"
            :width="$page.strapi.flexwerken.ImageSlider[0].width"
            :height="$page.strapi.flexwerken.ImageSlider[0].height"
          />
          <swiper
            v-else
            :options="swiperOptions"
            :style="`aspect-ratio: ${$page.strapi.flexwerken.ImageSlider[0].width}/${$page.strapi.flexwerken.ImageSlider[0].height}; height: auto;`"
            :width="$page.strapi.flexwerken.ImageSlider[0].width"
            :height="$page.strapi.flexwerken.ImageSlider[0].height"
          >
            <swiper-slide v-for="image in $page.strapi.flexwerken.ImageSlider" :key="image.name">
              <img
                :data-src="getStrapiMedia(image.url)"
                :data-srcset="getStrapiMedia(image.url)"
                :alt="image.alternativeText || image.name"
                :width="image.width"
                :height="image.height"
                :style="`aspect-ratio: ${image.width}/${image.height}; height: auto;`"
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
    flexwerken {
      Titel
      Beschrijving
      ImageSlider {
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
        autoHeight: true,
        effect: window === undefined ? 'fade' : window.innerWidth < 800 ? 'slide' : 'fade',
        lazy: {
          enabled: true,
        },
        loop: true,
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

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo
    };

    return {
      title: this.$page.strapi.flexwerken.Titel,
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

.nav-buttons {
  display: flex;
  gap: 1rem;
  margin: 4rem 0 2rem 0;

  @media (max-width: 64em) {
    flex-direction: column;
  }
}
</style>
