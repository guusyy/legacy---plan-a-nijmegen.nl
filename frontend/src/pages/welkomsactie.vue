<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1 class="page-title">Welkomsactie: Gratis dag flexwerken bij Plan_A</h1>
        <div class="activity-info">
          <p>
            Vul je gegevens hieronder in. Mocht de gekozen datum niet beschikbaar zijn nemen we contact met u op.
          </p>
        </div>
        <div class="contact-row">
          <form 
            name="welkomsactie"
            method="post"
            v-on:submit.prevent="handleSubmit"
            action="/success/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            v-if="formIsNotSubmitted"
          >
            <input type="hidden" name="form-name" value="membership" />
            <p class="fullname">
              <input type="text" name="naam" placeholder="Naam*" v-model="formData.naam" required />
              <input type="text" name="tussenvoegsel" placeholder="Tussenvoegsel" v-model="formData.tussenvoegsel" />
            </p>
            <p hidden>
              <label>
                Vul dit niet in: <input name="bot-field" />
              </label>
            </p>
            <p>
              <input type="text" name="achternaam" placeholder="Achternaam*" v-model="formData.achternaam" required />
            </p>
            <p>
              <input type="email" name="email" placeholder="E-Mail*" v-model="formData.email" required />
            </p>
            <p>
              <input type="text" name="telefoon" placeholder="Telefoon*" v-model="formData.telefoon" required />
            </p>
            <p class="address-inputs">
              <input type="text" name="postcode" placeholder="Postcode" v-model="formData.postcode" />
              <input type="text" name="huisnummer" placeholder="Huisnr." v-model="formData.huisnummer" />
              <input type="text" name="toevoegingen" placeholder="Toev." v-model="formData.toevoegingen" />
            </p>
            <p>
              <input type="text" name="straat" placeholder="Straat" v-model="formData.straat" />
            </p>
            <p>
              <input type="text" name="woonplaats" placeholder="Woonplaats" v-model="formData.woonplaats" />
            </p>
            <p>
              <label for="proefdag">Proefdag:</label>
              <input type="date" name="proefdag" placeholder="Proefdag" id="proefdag" v-model="formData.proefdag" />
            </p>
            <p>
              <button type="submit"><span>Verstuur</span><span>></span></button>
            </p>
          </form>
          <div class="succes-message" :class="formIsNotSubmitted ? 'hidden' : ''">
            <p>Bedankt voor het aanmelden voor een gratis dag flexwerken bij Plan_A. We nemen zo spoedig mogelijk contact met u op.</p>
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
  }
}
</page-query>

<script>
import VueMarkdown from "vue-markdown";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

import anime from 'animejs/lib/anime.es.js';

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
      title: 'Welkomsactie - gratis dag flexwerken',
      meta: getMetaTags(fullSeo),
      link: [
        {
          rel: "shortcut icon favicon",
          href: getStrapiMedia(favicon.url),
        },
      ],
    };
  },
  data() {
    return {
      formIsNotSubmitted: true,
      formData: {
      }
    }
  },
  mounted() {

    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.activity-info',
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
  methods: {
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
    }
  }
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

.activity-info {
  margin: 3rem 0;
  max-width: 100rem;
}

.contact-row {
  max-width: 800px;
  margin-bottom: 10rem;
  opacity: 0;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin: 4rem 0;

    .fullname {
      display: flex;
      gap: 1rem;

      :first-child {
        width: 60%;
      }

      :last-child {
        width: 40%;
      }

      @media (max-width: 48em) {
        flex-direction: column;
        
        :first-child {
          width: 100%;
        }

        :last-child {
          width: 100%;
        }
      }
    }

    label {
      font-size: 18px;
      padding: 0.5rem 1rem 0;
      line-height: 1;
      display: block;
    }

    & select, input {
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
        color: var(--pa-maroon);
      }
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
