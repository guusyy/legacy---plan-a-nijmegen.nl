<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">{{$page.strapi.community.Titel}}</h1>
        <div class="community-grid">
          <article class="community-item" v-for="(communityMember, index) in $page.strapi.community.community_members" :key="index">
            <g-image class="community-image" v-if="communityMember.Afbeelding" :src="getStrapiMedia(communityMember.Afbeelding.formats.small.url)" :alt="communityMember.Afbeelding.alternativeText || communityMember.Afbeelding.name" fit="contain"  />
            <div class="title">
              <h2>{{communityMember.NaamAchternaam}}</h2>
              <h3>{{communityMember.NaamBedrijf}}</h3>
            </div>
          </article>
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
    community {
      Titel
      community_members {
        NaamAchternaam
        NaamBedrijf
        Afbeelding {
          width
          height
          alternativeText
          name
          caption
          previewUrl
          url
          formats
        }
      }
    }
  }
}
</page-query>

<script>
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

import anime from 'animejs/lib/anime.es.js';

export default {
  components: {
  },
  methods: {
    getStrapiMedia
  },
  mounted: function() {
    anime({
      targets: '.community-grid .community-item',
      translateY: [-5, 0],
      opacity: [0, 1],
      duration: 1400,
      delay: anime.stagger(150)
    });
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
  grid-template-columns: 1fr;
  gap: 2rem;
}

.community-grid {
  margin: 5rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 3rem;

  & h2 {
    font-weight: 600;
    margin: .5rem 0;
    font-size: 2.2rem;
  }

  & h3 {
    font-weight: 600;
    font-size: 1.8rem;
  }

  & .community-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & .community-image {
    max-width: 100%;
    height: 100%;
    max-height: 30rem;
    min-height: 20rem;
    margin-bottom: 1rem;
    object-fit: cover;
  }
}
</style>
