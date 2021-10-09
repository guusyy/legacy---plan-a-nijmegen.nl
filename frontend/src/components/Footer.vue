<template>
  <footer class="pa-footer">
    <div class="col">
      <ul>
        <li>{{$static.strapi.global.Gegevens.StraatEnHuisnummer}}</li>
        <li>{{$static.strapi.global.Gegevens.PostcodeEnStad}}</li>
      </ul>
    </div>
    <div class="col">
      <ul>
        <li>{{$static.strapi.global.Gegevens.Telefoonnummer}}</li>
        <li><a :href="'mailto:' + $static.strapi.global.Gegevens.Email">{{$static.strapi.global.Gegevens.Email}}</a></li>
      </ul>
    </div>
    <div class="col">
      <table class="time-table">
        <tr v-if="$static.strapi.global.OpeningstijdDoordeweeks.Begintijd && $static.strapi.global.OpeningstijdDoordeweeks.Eindtijd">
          <td>Maandag t/m vrijdag</td>
          <td><span>{{$static.strapi.global.OpeningstijdDoordeweeks.Begintijd}}</span>-<span>{{$static.strapi.global.OpeningstijdDoordeweeks.Eindtijd}}</span></td>
        </tr>
        <tr v-if="$static.strapi.global.OpeningstijdZaterdag.Begintijd && $static.strapi.global.OpeningstijdZaterdag.Eindtijd">
          <td>Zaterdag</td>
          <td><span>{{$static.strapi.global.OpeningstijdZaterdag.Begintijd}}</span>-<span>{{$static.strapi.global.OpeningstijdZaterdag.Eindtijd}}</span></td>
        </tr>
        <tr v-if="$static.strapi.global.OpeningstijdZondag.Begintijd && $static.strapi.global.OpeningstijdZondag.Eindtijd">
          <td>Zondag</td>
          <td><span>{{$static.strapi.global.OpeningstijdZondag.Begintijd}}</span>-<span>{{$static.strapi.global.OpeningstijdZondag.Eindtijd}}</span></td>
        </tr>
      </table>
    </div>
    <div class="col">
      <ul>
        <li><a target="_blank" :href="$static.strapi.global.Gegevens.Facebook">Facebook</a></li>
        <li><a target="_blank" :href="$static.strapi.global.Gegevens.Instagram">Instagram</a></li>
      </ul>
    </div>
    <div class="col">
      <ul>
        <li><g-link to="/disclaimer/">Disclaimer</g-link></li>
        <li><g-link to="/privacy-beleid/">Privacybeleid</g-link></li>
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
      OpeningstijdDoordeweeks {
        Begintijd
        Eindtijd
      }
      OpeningstijdZaterdag {
        Begintijd
        Eindtijd
      }
      OpeningstijdZondag {
        Begintijd
        Eindtijd
      }
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

.time-table td:first-child {
  padding: 0rem 2rem 0 0;
}

</style>