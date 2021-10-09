<template>
  <Layout>
    <div class="container">
      <div class="intro-row">
        <div class="column" >
          <h1>{{$page.strapi.ruimteHuren .Titel}}</h1>
          <p style="margin-top: 3rem;">{{$page.strapi.ruimteHuren.introTekst}}</p>
        </div>
      </div>
      <div class="workspace-row" v-if="$page.strapi.ruimteHuren.ruimtes">
        <div class="workspace-item" v-for="(ruimte, index) in $page.strapi.ruimteHuren.ruimtes" :key="index">
          <g-image v-if="ruimte.Afbeelding" :src="getStrapiMedia(ruimte.Afbeelding.url)" :alt="ruimte.Afbeelding.alternativeText || ruimte.Afbeelding.name" />
          <h3>{{ruimte.Titel}}</h3>
          <p class="workspace-description">{{ruimte.Omschrijving}}</p>
          <button @click="handleGoToForm(ruimte.Titel)">{{ruimte.ButtonTekst}}</button>
        </div>
      </div>
      <div class="contact-row" ref="form">
        <h2>{{$page.strapi.ruimteHuren.ContactIntro}}</h2>
        <form name="contact" method="POST" data-netlify="true">
          <p>
            <select name="ruimte[]" v-model="activeRuimte"  v-if="$page.strapi.ruimteHuren.ruimtes">
              <option v-for="(ruimte, index) in $page.strapi.ruimteHuren.ruimtes" :value="ruimte.Titel" :key="index">{{ruimte.Titel}}</option>
            </select>
          </p>
          <p>
            <input type="text" name="name" placeholder="Naam" />
          </p>
          <p>
            <input type="email" name="email" placeholder="E-Mail" />
          </p>
          <p>
            <input type="text" name="telefoon" placeholder="Telefoon" />
          </p>
          <p>
            <input type="date" name="geboortedatum" placeholder="Geboortedatum" />
          </p>
          <p class="address-inputs">
            <input type="text" name="postcode" placeholder="Postcode" />
            <input type="text" name="huisnummer" placeholder="Huisnr." />
            <input type="text" name="toevoegingen" placeholder="Toev." />
          </p>
          <p>
            <textarea name="opmerking" placeholder="Opmerking" />
          </p>
          <p>
            <button type="submit"><span>Verstuur</span><span>></span></button>
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
    ruimteHuren{
     	Titel
      introTekst
      ruimtes {
        Titel
        Omschrijving
        ButtonTekst
        Afbeelding {
          width
          height
          alternativeText
          name
          caption
          previewUrl
          url
        }
      }
      ContactIntro
    }
  }
}
</page-query>

<script>
import Articles from "~/components/Articles";
import VueMarkdown from "vue-markdown";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

import anime from 'animejs/lib/anime.es.js';

export default {
  components: {
    Articles,
    VueMarkdown
  },
  data() {
    return {
      activeRuimte: ''
    }
  },
  mounted() {

    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.workspace-item',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
        delay: anime.stagger(100) // increase delay by 100ms for each elements.
      }, 100)
      .add({
        targets: '.contact-row',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
      }, 500)
  },
  beforeMount() {
    this.activeRuimte = this.$page.strapi.ruimteHuren.ruimtes[0].Titel
  },
  methods:{
    handleGoToForm(value) {
      this.activeRuimte = value;

      this.$refs.form.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    },
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

.intro-row {
  margin-bottom: 4rem;

  & p {
    font-size: 2.4rem;
  }
}

.workspace-row {
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    grid-template-row: repeat(2, 1fr);
  }

  & .workspace-item {
    padding: 1rem 0rem;
    & h3 {
      margin: 4rem 0 1rem 0;
      font-size: 3rem;
      font-weight: 600;
    }

    & .workspace-description {
      margin: 2rem 0;
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
      font-size: 2.2rem;
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

.contact-row {

  & h2 {
    font-size: 3.5rem;
    font-weight: 500;
    margin: 2rem 0;
    line-height: 5rem;
  }

  form {
    width: 100%;
    max-width: 60rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin: 4rem 0;

    

    & select, input, textarea {
      font-size: 2rem;
      font-weight: 600;      
      width: 100%;
      height: 5rem;      
      border: none;
      border-bottom: 1px solid var(--pa-maroon);
      background: var(--pa-white);
      color: var(--pa-maroon);
      padding: .5rem 1rem;

      @media (max-width: 64em) {
        height: 6rem;
      }

      &:focus {
        outline: 0;
      }

      &::placeholder {
        opacity: 0.4;
        font-weight: 400;
      }
    }

    textarea {
      height: 10rem;
      resize: none;
    }

    select {
      display: flex;
    }

    button {
      border: 1px solid var(--pa-maroon);
      background: var(--pa-white);
      font-size: 2rem;
      text-transform: uppercase;
      padding: 1rem;
      color: var(--pa-maroon);
      cursor: pointer;
      transition: all .1s ease;
      margin: 2rem 0;
      display: flex;
      gap: 2rem;
      margin-left: auto;

      &:focus {
        outline: 0;
      }

      &:hover {
        background: var(--pa-maroon);
        color: var(--pa-white);
      }
    }
  }

  .address-inputs {
    display: flex;
    gap: 1rem;

    @media (max-width: 48em) {
      flex-direction: column;
    }
  }
}
</style>
