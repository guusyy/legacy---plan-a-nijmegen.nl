<template>
  <Layout>
    <div class="container">
      <div class="intro-row">
        <div class="column" >
          <h1>{{$page.strapi.membership.Titel}}</h1>
          <p style="margin-top: 3rem;">{{$page.strapi.membership.introTekst}}</p>
        </div>
      </div>
      <div class="membership-row">
        <div class="membership-item" v-for="(membership, index) in $page.strapi.membership.abonnementens" :key="index">
          <h3>{{membership.titel}}</h3>
          <div class="price">€{{membership.prijsPm.toFixed(2).toString().replace(".", ",")}} <span class="price-label">per maand</span></div>
          <ul class="features">
            <li v-for="(perk, index) in membership.perks" :key="index">{{perk.Perknaam}}</li>
          </ul>
          <button>{{membership.buttonTekst}}</button>
        </div>
      </div>
      <div class="contact-row">
        <h2>{{$page.strapi.membership.contactIntro}}</h2>
        <form name="contact" method="POST" data-netlify="true">
          <p>
            <label>Membership: <select name="membership[]" multiple>
              <option value="vastFlex">Vast Flex</option>
              <option value="studentFlex">Student Flex</option>
            </select></label>
          </p>
          <p>
            <label>Naam: <input type="text" name="name" /></label>   
          </p>
          <p>
            <label>E-mail: <input type="email" name="email" /></label>
          </p>
          <p>
            <label>Adres: <input type="text" name="adres" /></label>
          </p>
          <p>
            <label>Telefoon: <input type="text" name="telefoon" /></label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
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
    membership {
      Titel
      introTekst
      abonnementens {
        titel
        prijsPm
        buttonTekst
        perks {
          Perknaam
        }
      }
      contactIntro
    }
  }
}
</page-query>

<script>
import Articles from "~/components/Articles";
import VueMarkdown from "vue-markdown";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

export default {
  components: {
    Articles,
    VueMarkdown
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

.intro-row {
  margin-bottom: 4rem;

  & p {
    font-size: 2.4rem;
  }
}

.membership-row {
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    grid-template-row: repeat(2, 1fr);
  }

  & .membership-item {

    border-top: 1px solid var(--pa-maroon);
    padding: 1rem 0rem;
    & h3 {
      font-size: 3rem;
      font-weight: 600;
    }
  }

  & .price {
    margin: 1rem 0;
    font-size: 2.2rem;

    & .price-label {
      font-size: 1.4rem;
    }
  }

  & .features {
    list-style-type: "-";
    margin: 2rem 0 2rem 1rem;

    & li {
      padding-left: 1rem;
      margin: .5rem 0;
      font-size: 1.8rem;
    }
  }

  & button {
    border: 1px solid var(--pa-maroon);
    background: var(--pa-white);
    font-size: 2rem;
    text-transform: uppercase;
    padding: 1rem;
    color: var(--pa-maroon);
    cursor: pointer;
    transition: all .1s ease;
    margin: 2rem 0;

    &:focus {
      outline: 0;
    }

    &:hover {
      background: var(--pa-maroon);
      color: var(--pa-white);
    }
  }
}
</style>
