<template>
  <footer class="pa-footer">
    <VueMarkdown class="col" :source="$static.strapi.footer.FooterColumnOne" />
    <VueMarkdown class="col" :source="$static.strapi.footer.FooterColumnTwo" />
    <VueMarkdown class="col" :source="$static.strapi.footer.FooterColumnThree" />
    <div class="col">
      <ul>

        <li v-if="$static.strapi.global.Gegevens.Facebook"><a target="_blank" :href="$static.strapi.global.Gegevens.Facebook">Facebook</a></li>
        <li v-if="$static.strapi.global.Gegevens.Instagram"><a target="_blank" :href="$static.strapi.global.Gegevens.Instagram">Instagram</a></li>
      
      </ul>
    </div>
    <div class="col">
      <ul>
        <li><g-link to="/disclaimer/">Disclaimer</g-link></li>
        <li><g-link to="/privacy-beleid/">Privacybeleid</g-link></li>
        <li><g-link to="/algemene-voorwaarden/">Algemene Voorwaarden</g-link></li>
        <li><g-link to="/colofon/">Colofon</g-link></li>
      </ul>
    </div>
  </footer>
</template>

<static-query>
query {
  strapi {
    global {
      siteName
      Gegevens {
        Facebook
        Instagram
        StraatEnHuisnummer
        PostcodeEnStad
        Telefoonnummer
        Email
      }
    }
    footer {
      FooterColumnOne
      FooterColumnTwo
      FooterColumnThree
    }
  }
}
</static-query>

<script>
import VueMarkdown from "vue-markdown";

export default {
  components:  {
    VueMarkdown
  }
}

</script>

<style lang="scss">

.pa-footer {
  border-top: 1px solid var(--pa-maroon);
  padding: 2rem 0;
  line-height: 2rem;
  font-size: 1.4rem;

  display: grid;
  grid-template-columns: repeat(5, minmax(0,1fr));
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 80em) {
    grid-template-columns: minmax(0,1fr) minmax(0,1fr);
    margin-top: 8rem;
  }

  @media (max-width: 64em) {
    grid-template-columns: minmax(0,1fr);
    margin-top: 8rem;
  }

  & * {
    line-height: 2rem;
    font-size: 1.4rem;
  }

  table {
    width: 100%;
    max-width: 25rem;
  }

  h2, h3, h4 {
    text-transform: uppercase;
  }
}

.time-table td:first-child {
  padding: 0rem 2rem 0 0;
}

.time-table-title {
  line-height: 2rem;
  font-size: 1.4rem;
  text-transform: uppercase;
}

</style>