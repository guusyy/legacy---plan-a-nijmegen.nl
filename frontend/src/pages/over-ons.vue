<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1>Over ons</h1>
        <p style="margin-top: 3rem;">
          Plan A is een multifunctionele plek in Nijmegen-West die zakelijke en sociale verbinding creeert voor iedereen die wil ontmoeten en ondernemen. Overdag een werkplek, in de avond en het weekend een plek om gezellig te borrelen. Door diverse activiteiten en mensen onder een dak samen te brengen, ontstaan er nieuwe samenwerkingen en kansen. <br /> <br />
          De plek bestaat uit werkruimtes, flexibele werkplekken en horeca. Daarnaast worden er diverse evenementen georganiseerd. Door middel van memberships kan iedereen lid worden en naar eigen behofte kiezen waar hij gebruik van wilt maken. Drie kenrnwaarden van Plan A zijn.  
        </p>
      </div>
      <div class="column">
        <g-image src="~/assets/placeholder.png"/>
      </div>
    </div>
  </Layout>
</template>

<page-query>
</page-query>

<script>
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

export default {
  components: {
  },
  metaInfo() {

    return {
      link: [
        {
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
  grid-template-columns: calc(40% - 1rem) calc(60% - 1rem);
  gap: 2rem;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    grid-template-row: repeat(2, 1fr);
  }
}

.column {

  & img {
    
  }
}
</style>
