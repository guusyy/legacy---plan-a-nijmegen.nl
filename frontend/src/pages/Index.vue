<template>
  <Layout>
    <div class="pa-container">
      <div class="intro-text">
        <VueMarkdown :source="$page.strapi.homepage.hero.introTekst" class="intro-rte" />
      </div>
      <div class="hero-image" v-if="$page.strapi.homepage.hero.HeroRandomImages[0]">
        <g-image 
          :src="getStrapiMedia($page.strapi.homepage.hero.HeroRandomImages[randomImageIndex].url)" 
          :alt="$page.strapi.homepage.hero.HeroRandomImages[randomImageIndex].alternativeText || $page.strapi.homepage.hero.HeroRandomImages[randomImageIndex].name" 
        />
      </div>
      <div class="pa-quickbuttons-container">
        <g-link class="pa-quickbutton" :to="`/${knop.LinkTekst}`" v-for="knop in $page.strapi.homepage.hero.homepaginaknop" :key="knop.id">
          <h4 class="pa-label">{{knop.TekstKnop}}</h4>
          <span class="pa-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.868 29.5">
              <path d="M1.6,29.7.4,28.1,17.933,15,.4,1.8,1.6.2,21.267,15Z" transform="translate(-0.398 -0.201)"/>
            </svg>
          </span>
        </g-link>
      </div>
      <div class="pa-contact-info" v-if="$page.strapi.homepage.hero.infoContact">
        <VueMarkdown :source="$page.strapi.homepage.hero.infoContact" class="intro-contact" />
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
    homepage {
      hero {
        introTekst
        infoContact
        homepaginaknop {
          TekstKnop
          LinkTekst
        }
        HeroRandomImages {
          width
          height
          alternativeText
          name
          url
          formats
        }
      }
      seo {
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
import VueMarkdown from "vue-markdown";
import Articles from "~/components/Articles";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

import anime from 'animejs/lib/anime.es.js';

export default {
  components: {
    Articles,
    VueMarkdown
  },
  methods: {
    getStrapiMedia
  },
  data() {
    return {
      randomImageIndex: 0
    }
  },
  beforeMount() {
    this.randomImageIndex = Math.floor(Math.random() * this.$page.strapi.homepage.hero.HeroRandomImages.length);
  },
  mounted() {

    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.intro-text',
        translateY: [-20, 0],
        delay: 100,
        opacity: [0, 1],
        duration: 1700,
      })
      .add({
        targets: '.hero-image',
        translateY: [-5, 0],
        delay: 100,
        opacity: [0, 1],
        duration: 1700,
      }, 300)
      .add({
        targets: '.pa-quickbutton',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
        delay: anime.stagger(200) // increase delay by 100ms for each elements.
      }, 700)
      .add({
        targets: '.pa-contact-info',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1400,
      }, 1500)
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
          rel: "favicon shortcut icon",
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
};
</script>

<style lang="scss">

.pa-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 64em ) {
    min-height: 80vh;
  }
}

.intro-text, .pa-quickbutton, .pa-contact-info {
  opacity: 0;
}

.intro-rte h1 {
  font-size: clamp(3rem, 3vw + 1rem, 5.6rem);
  font-size: clamp(3rem, 3vw + 1rem, 6rem);
  letter-spacing: -.2rem;
  color: var(--pa-maroon);
  font-weight: 400;
  max-width: 80%;
  margin: 5rem 0;
  line-height: 1.15;
  word-break: break-word;

  & a {
    color: var(--pa-maroon);
    text-decoration: underline;
  }

  @media (max-width: 64em) {
    max-width: 90%;
    margin: 2rem 0;
  }
}

.pa-quickbuttons-container {

  display: flex;
  gap: 2rem;
  margin: 5rem 0;

  @media (max-width: 64em) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    margin: 2rem 0 5rem 0;
  }

  @media (max-width: 48em) {
    display: flex;
    flex-wrap: wrap;
  }

  
  & .pa-quickbutton {
    width: 100%;
    background: var(--pa-white);
    border: 1px solid var(--pa-maroon);
    color: var(--pa-maroon);
    min-height: 20rem;
    text-decoration: none;
    font-weight: 400;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    flex-direction: column;

    transition: all .1s ease;

    @media (max-width: 48em) {
      min-height: 6.4rem;
      flex-direction: row;
      align-items: center;
    }
    

    &:hover {
      background: var(--pa-maroon);
      color: var(--pa-white);

      & .pa-arrow svg {
        fill: var(--pa-white);
      }
    }

    & .pa-label {
      word-break: break-word;
      font-size: clamp(1.6rem, 1.3vw + 1rem, 2.8rem);
      letter-spacing: -.1rem;

      @media (max-width: 64em) {
        font-size: 2.4rem;
      }

      font-weight: 400;
    }

    & .pa-arrow {
      align-self: flex-end;
      font-size: 4rem;

      
      @media (max-width: 64em) {
        flex-wrap: wrap;  
      }

      & svg {
        width: 2rem;
        height: 2.9rem;
        fill: var(--pa-maroon);
      }
    }
  }
}


.intro-contact * {
  text-decoration: none;
  color: var(--pa-maroon);
  font-weight: 400;
  font-size: clamp(2.8rem, 3vw + 1rem, 3.2rem);

  @media (max-width: 64em) {
    font-size: 2.4rem;
  }
}

.hero-image img {
  width: 100%;
}

</style>