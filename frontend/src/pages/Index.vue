<template>
  <Layout>
    <div class="pa-container">
      <div class="intro-text">
        <VueMarkdown :source="$page.strapi.homepage.hero.introTekst" class="intro-rte" />
      </div>
      <div class="pa-quickbuttons-container">
        <g-link class="pa-quickbutton" :to="`/${knop.LinkTekst}`" v-for="knop in $page.strapi.homepage.hero.homepaginaknop" :key="knop.id">
          <h4 class="pa-label">{{knop.TekstKnop}}</h4>
          <span class="pa-arrow">></span>
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
        targets: '.pa-quickbutton',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
        delay: anime.stagger(200) // increase delay by 100ms for each elements.
      }, 400)
      .add({
        targets: '.pa-contact-info',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1400,
      }, 1200)
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

<style lang="scss">

.pa-container {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.intro-text, .pa-quickbutton, .pa-contact-info {
  opacity: 0;
}

.intro-rte h1 {
  font-size: clamp(3.4rem, 3vw + 1rem, 5.2rem);
  color: var(--pa-maroon);
  font-weight: 600;
  max-width: 80%;
  margin: 5rem 0;
  line-height: 1.15;
  word-break: break-word;

  // @media (max-width: 64em) {
  //   max-width: 100%;
  //   font-size: 4rem;
  // }

  & a {
    color: var(--pa-maroon);
    text-decoration: underline;
  }
}

.pa-quickbuttons-container {

  display: flex;
  gap: 2rem;

  @media (max-width: 64em) {
    flex-wrap: wrap;  
  }

  margin: 5rem 0;
  
  & .pa-quickbutton {
    width: 100%;
    background: var(--pa-white);
    border: 1px solid var(--pa-maroon);
    color: var(--pa-maroon);
    min-height: 20rem;
    text-decoration: none;

    display: flex;
    justify-content: space-between;
    padding: 2rem;


    transition: all .1s ease;
    

    &:hover {
      background: var(--pa-maroon);
      color: var(--pa-white);
    }

    & .pa-label {
      word-break: break-word;
      font-size: clamp(2.8rem, 3vw + 1rem, 3.2rem);
    }

    & .pa-arrow {
      align-self: flex-end;
      font-size: 4rem;

      
      @media (max-width: 64em) {
        flex-wrap: wrap;  
      }
    }
  }
}


.intro-contact * {
  text-decoration: none;
  color: var(--pa-maroon);
  font-weight: 600;
  font-size: clamp(2.8rem, 3vw + 1rem, 3.8rem);
}

</style>