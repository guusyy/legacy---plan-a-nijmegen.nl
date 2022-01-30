<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">Contact</h1>
        <div class="contactpage-contact-info" v-if="$page.strapi.contact.introTekst">
          <VueMarkdown :source="$page.strapi.contact.introTekst" class="contact-info" />
        </div>
        <div class="pa-contact-businesshours" v-if="$page.strapi.contact.introTekst">
          <div class="pa-contact-bar-restaurant">
            <VueMarkdown :source="$page.strapi.contact.openingtijdenBarRestaurant" class="contact-bar-restaurant" />
          </div>
          <div class="pa-contact-workroom">
            <VueMarkdown :source="$page.strapi.contact.openingstijdenWerkzaal" class="contact-workroom" />
          </div>
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
    contact {
      Titel
      introTekst
      openingtijdenBarRestaurant
      openingstijdenWerkzaal
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
  metaInfo() {
    const { defaultSeo, favicon } = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo
    };

    return {
      title: this.$page.strapi.contact.Titel,
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
  grid-template-columns: minmax(10px, 1fr);
  gap: 2rem;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }
}

.contactpage-contact-info {
  margin: 3rem 0;
}

.pa-contact-businesshours {
  margin-top: 5rem;
  display: flex;
  gap: 15rem;
  
  & .pa-contact-workroom p {
    line-height: 3rem;
  }

  @media (max-width: 64em) {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
