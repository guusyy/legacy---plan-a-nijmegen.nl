<template>
  <Layout>
    <div class="container">
      <div class="column" >
        <h1>Flexwerken</h1>
        <p style="margin-top: 3rem;">Beschrijving van flexwerkplekken en een aantal foto's van de werkzaal hiernaast. Beschrijving van flexwerkplekken en een aantal foto's van de werkzaal hiernaast. Beschrijving van flexwerkplekken en een aantal foto's van de werkzaal hiernaast. </p>
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
import Articles from "~/components/Articles";
import { getMetaTags } from "~/utils/seo";
import { getStrapiMedia } from "~/utils/medias";

export default {
  components: {
    Articles,
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
