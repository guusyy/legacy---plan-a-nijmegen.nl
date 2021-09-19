<template>
  <footer class="pa-footer">
    <div class="col">
      <ul>
        <li>Vlierstraat 24</li>
        <li>6524 SM Nijmegen</li>
      </ul>
    </div>
    <div class="col">
      <ul>
        <li>+31 6 123 456 78</li>
        <li><a href="#">info@plan-a-nijmegen.nl</a></li>
      </ul>
    </div>
    <div class="col">
      <ul>
        <li>Maandag t/m vrijdag</li>
        <li>Zaterdag</li>
        <li>Zondag</li>
      </ul>
      <ul>
        <li>00:00-00:00</li>
        <li>00:00-00:00</li>
        <li>00:00-00:00</li>
      </ul>
    </div>
    <div class="col">
      <ul>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Instagram</a></li>
      </ul>
    </div>
    <div class="col">
      <ul>
        <li><a href="#">Disclaimer</a></li>
        <li><a href="#">Privacybeleid</a></li>
      </ul>
    </div>
  </footer>
</template>

<static-query>
query {
  strapi {
    global {
      siteName
    }
  }
}
</static-query>

<style lang="scss" scoped>

.pa-footer {
  margin-top: 20rem;
  border-top: 2px solid var(--pa-maroon);
  padding: 2rem 0;
  line-height: 2.5rem;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.col {
  display: flex;
  gap: 1rem;
}
</style>