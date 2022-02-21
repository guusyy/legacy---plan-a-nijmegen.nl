<template>
  <Layout>
    <div class="container">
      <div class="intro-row">
        <div class="column" >
          <h1 class="page-title">{{$page.strapi.ruimteHuren .Titel}}</h1>
          <p style="margin-top: 3rem;">{{$page.strapi.ruimteHuren.introTekst}}</p>
        </div>
      </div>
      <div class="workspace-row" v-if="$page.strapi.ruimteHuren.ruimtes">
        <div class="workspace-item" v-for="(ruimte, index) in $page.strapi.ruimteHuren.ruimtes" :key="index">
          <g-image 
            v-if="ruimte.Afbeelding.length < 2"
            :src="getStrapiMedia(ruimte.Afbeelding[0].url)" 
            :alt="ruimte.Afbeelding[0].alternativeText || ruimte.Afbeelding[0].name" 
          />
          <swiper
            v-else
            :options="swiperOptions"
          >
            <swiper-slide v-for="image in ruimte.Afbeelding" :key="image.name">
              <g-image :src="getStrapiMedia(image.url)" :alt="image.alternativeText || image.name" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
          <h3>{{ruimte.Titel}}</h3>
          <VueMarkdown class="workspace-description" :source="ruimte.Omschrijving" />
          <button @click="handleGoToForm(ruimte.Titel)">{{ruimte.ButtonTekst}}</button>
        </div>
      </div>
      <div class="contact-row" ref="form">
        <div>
          <h2 class="text">{{$page.strapi.ruimteHuren.ContactIntro}}</h2>
          <form 
            name="ruimteHuren"
            method="post"
            v-on:submit.prevent="handleSubmit"
            action="/success/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            v-if="formIsNotSubmitted"
          >
            <input type="hidden" name="form-name" value="ruimteHuren" />
            <p>
              <div style="position: relative;">
                <select name="gekozenRuimte" v-model="formData.gekozenRuimte"  v-if="$page.strapi.ruimteHuren.ruimtes">
                  <option v-for="(ruimte, index) in $page.strapi.ruimteHuren.ruimtes" :value="ruimte.Titel" :key="index">{{ruimte.Titel}}</option>
                </select>
                <svg class="select-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.424 14.144"><path d="M868.108,427.449l-12.944-9.712,12.944-9.712,1.2,1.6L858.5,417.737l10.812,8.112Z" transform="translate(-408.025 869.309) rotate(-90)" fill="#691e0f"/></svg>
              </div>
            </p>
            <p>
              <input type="text" name="naam" placeholder="Naam*" v-model="formData.naam" required />
            </p>
            <p hidden>
              <label>
                Vul dit niet in: <input name="bot-field" />
              </label>
            </p>
            <p>
              <input type="email" name="email" placeholder="E-Mail*" v-model="formData.email" required />
            </p>
            <p>
              <input type="text" name="telefoon" placeholder="Telefoon*" v-model="formData.telefoon" required />
            </p>
            <p>
              <input type="date" name="geboortedatum" placeholder="Geboortedatum" v-model="formData.geboortedatum" />
            </p>
            <p class="address-inputs">
              <input type="text" name="postcode" placeholder="Postcode" v-model="formData.postcode" />
              <input type="text" name="huisnummer" placeholder="Huisnr." v-model="formData.huisnummer" />
              <input type="text" name="toevoegingen" placeholder="Toev." v-model="formData.toevoegingen" />
            </p>
            <p>
              <textarea name="opmerking" placeholder="Opmerking" v-model="formData.opmerking" />
            </p>
            <p>
              <button type="submit"><span>Verstuur</span><span>></span></button>
            </p>
          </form>
          <div class="succes-message" :class="formIsNotSubmitted ? 'hidden' : ''">
            <p>{{$page.strapi.ruimteHuren.ContactSuccesMessage}}</p>
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
          formats
        }
      }
      ContactIntro
      ContactSuccesMessage
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

import anime from 'animejs/lib/anime.es.js';

export default {
  components: {
    VueMarkdown,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      formIsNotSubmitted: true,
      formData: {
        gekozenRuimte: null
      },
      swiperOptions: {
        slidesPerView: 1,
        autoplay: false,
        loop: true,
        autoHeight: true,
        effect: 'fade',
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
    this.formData.gekozenRuimte = this.$page.strapi.ruimteHuren.ruimtes[0].Titel
  },
  methods:{
    handleGoToForm(value) {
      this.formData.gekozenRuimte = value;

      this.$refs.form.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    },
    encode(data) {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
    },
    handleSubmit(e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': e.target.getAttribute('name'),
          ...this.formData,
        }),
      })
      .then(() => this.formIsSubmittedHandler())
      .catch(error => alert(error))
    },
    formIsSubmittedHandler() {
      this.formIsNotSubmitted = false;

      anime({
        targets: '.succes-message',
        translateY: [-10, 0],
        opacity: [0, 100],
        duration: 1000
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
      title: this.$page.strapi.ruimteHuren.Titel,
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

.select-arrow-down {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translate(0, -50%);
  width: 1.6rem;
  pointer-events: none;
}

.intro-row {
  margin-bottom: 4rem;
}

.workspace-row {
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  & .workspace-item {
    padding: 1rem 0rem;
    & h3 {
      margin: 4rem 0 1rem 0;
      font-size: 3rem;
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

  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4rem;
  margin-bottom: 10rem;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin: 4rem 0;

    

    & select, input, textarea {
      font-size: 2rem;  
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

.succes-message {

  width: 100%;
  min-height: 20rem;
  align-items: center;
  text-decoration: underline;
  display: flex;
  text-align: left;

  &.hidden {
    display: none;
    opacity: 0;
  }
}
</style>
