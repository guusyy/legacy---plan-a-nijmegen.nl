<template>
  <Layout>
    <div class="container">
      <div class="intro-row">
        <div class="column" >
          <h1 class="page-title">{{$page.strapi.membership.Titel}}</h1>
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
          <button @click="handleGoToForm(membership.titel)">{{membership.buttonTekst}}</button>
        </div>
      </div>
      <div class="contact-row" ref="form">
        <div>
          <h2 class="text">{{$page.strapi.membership.contactIntro}}</h2>
          <form 
            name="membership"
            method="post"
            v-on:submit.prevent="handleSubmit"
            action="/success/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            v-if="formIsNotSubmitted"
          >
            <input type="hidden" name="form-name" value="membership" />
            <p>
              <div style="position: relative;" >
                <select name="gekozenMembership" v-model="formData.gekozenMembership">
                  <option v-for="(membership, index) in $page.strapi.membership.abonnementens" :value="membership.titel" :key="index">{{membership.titel}} (€{{membership.prijsPm.toFixed(2).toString().replace(".", ",")}})</option>
                </select>
                <svg class="select-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.424 14.144"><path d="M868.108,427.449l-12.944-9.712,12.944-9.712,1.2,1.6L858.5,417.737l10.812,8.112Z" transform="translate(-408.025 869.309) rotate(-90)" fill="#691e0f"/></svg>
              </div>
            </p>
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
            <p>
              <input type="date" name="geboortedatum" placeholder="Geboortedatum" v-model="formData.geboortedatum" />
            </p>
            <p class="address-inputs">
              <input type="text" name="postcode" placeholder="Postcode" v-model="formData.postcode" />
              <input type="text" name="huisnummer" placeholder="Huisnr." v-model="formData.huisnummer" />
              <input type="text" name="toevoegingen" placeholder="Toev." v-model="formData.toevoegingen" />
            </p>
            <p>
              <button type="submit"><span>Verstuur</span><span>></span></button>
            </p>
          </form>
          <div class="succes-message" :class="formIsNotSubmitted ? 'hidden' : ''">
            <p>{{$page.strapi.membership.ContactSuccesMessage}}</p>
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
      ContactSuccesMessage
    }
  }
}
</page-query>

<script>
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

import anime from 'animejs/lib/anime.es.js';

export default {
  data() {
    return {
      formIsNotSubmitted: true,
      formData: {
        gekozenMembership: null
      }
    }
  },
  beforeMount() {
    this.formData.gekozenMembership = this.$page.strapi.membership.abonnementens[0].titel
  },
  mounted() {

    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.membership-item',
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
  methods:{
    handleGoToForm(value) {
      this.formData.gekozenMembership = value;

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
    }
  },
  metaInfo() {
    const { defaultSeo, favicon } = this.$page.strapi.global;

    // Merge default and article-specific SEO data
    const fullSeo = {
      ...defaultSeo
    };

    return {
      title: this.$page.strapi.membership.Titel,
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
  max-width: 120rem;
}

.membership-row {
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  & .membership-item {

    border-top: 1px solid var(--pa-maroon);
    padding: 1rem 0rem;
    opacity: 0;

    & h3 {
      font-size: 3rem;
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
    margin: 2rem 0;
    list-style-type: none;

    & li {
      padding-left: 2rem;
      margin: .5rem 0;
      font-size: 2.2rem;
      
      &:before {
        content: "–";
        position: absolute;
        margin-left: -2rem;
      }
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
  opacity: 0;

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
