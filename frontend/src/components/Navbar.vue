<template>
  <div class="pa-navbar">
    <div class="logo-holder">
      <div class="logo-left-holder">
        <g-link to="/">
          <img src="../assets/PLAN_A_Logo_1_onderdeel_1.svg" alt="">
        </g-link>
      </div>
      <div class="pa-logo-border"></div>
      <div class="logo-right-holder">
        <g-link to="/">
          <img src="../assets/PLAN_A_Logo_1_onderdeel_3.svg" alt="">
        </g-link>
      </div>
    </div>
      
    <nav class="pa-navigation">
      <transition name="fade">
        <div v-if="navigationPanelVisible" class="pa-navigation-list-mobile-container overlay-content">
          <ul class="pa-navigation-list-mobile">
            <li><g-link to="/eten-drinken/">Eten & Drinken</g-link></li>
            <li><g-link to="/flexwerken/">Werken</g-link></li>
            <li><g-link to="/membership/">Membership</g-link></li>
            <li><g-link to="/ruimte-huren/">Ruimte huren</g-link></li>
            <li><g-link to="/community/">Community</g-link></li>
            <li><g-link to="/over-ons/">Over ons</g-link></li>
            <li><g-link to="/contact/">Contact</g-link></li>
          </ul>
        </div>
      </transition>
      <ul class="pa-navigation-list">
        <li><g-link to="/eten-drinken/">Eten & Drinken</g-link></li>
        <li><g-link to="/flexwerken/">Werken</g-link></li>
        <li><g-link to="/membership/">Membership</g-link></li>
        <li><g-link to="/ruimte-huren/">Ruimte huren</g-link></li>
        <li><g-link to="/community/">Community</g-link></li>
        <li><g-link to="/over-ons/">Over ons</g-link></li>
        <li><g-link to="/contact/">Contact</g-link></li>
      </ul>
      <button class="pa-mobile-nav-button" @click="navigationPanelVisible = !navigationPanelVisible">
        <svg viewBox="0 0 341.333 341.333">
          <g>
            <g>
              <rect y="277.333" width="341.333" height="42.667"/>
            </g>
          </g>
          <g>
            <g>
              <rect y="149.333" width="341.333" height="42.667"/>
            </g>
          </g>
          <g>
            <g>
              <rect y="21.333" width="341.333" height="42.667"/>
            </g>
          </g>
        </svg>
      </button>
    </nav>
  </div>
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

<script>

export default {
  data() {
    return {
      navigationPanelVisible: false
    }
  }
};
</script>

<style lang="scss" scoped>

.logo-holder {
  position: fixed;
  display: flex;
  top: 0;
  width: 100vw;
  background: var(--pa-white);
  z-index: 100000;
}

.logo-left-holder {
  min-width: 8.5rem;
  height: calc(5rem + .4rem);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index:100000;
  margin-top: .1rem;

  @media (max-width: 64em) {
    min-width: 6.5rem;
    height: 4rem;
  }

  & img {
    height: 3rem;
    width: 6.4rem;

    @media (max-width: 64em) {
      height: 2.5rem;
      width: 5.2rem;
    }
  }

  & a {
    display: flex;
    margin-bottom: 4px;

    @media (max-width: 64em) {
      margin-bottom: 3px;
    }
  }
}

.logo-right-holder {
  min-width: 5rem;
  height: calc(5rem + .4rem);
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  z-index:100000;
  margin-top: .1rem;

  @media (max-width: 64em) {
    min-width: 3.5rem;
    height: 4rem;
  }

  & img {
    height: 3rem;
    width: 2.4rem;
    
    @media (max-width: 64em) {
      height: 2.5rem;
      width: 1.9rem;
    }
  }

  & a {
    display: flex;
    margin-bottom: 4px;

    @media (max-width: 64em) {
      margin-bottom: 3px;
    }
  }
}

.pa-navbar {

  font-family: "Helvetica condensed bold", "Helvetica Neue",Arial,"Noto Sans",sans-serif;
  
  & .pa-logo-border {
    width: 100%;
    border-bottom: 4px solid var(--pa-red);
    transform: translateX(0px);
    background-color: var(--pa-white);

    @media (max-width: 64em) {
      border-width: 3px;
    }
  }

  & .pa-navigation {
    margin: 6rem 5rem 0 9.5rem;
    padding: 1rem 0;

    display: flex;
    justify-content: flex-end;

    @media (max-width: 64em) {
      margin: 5rem 3.5rem 0 6.5rem;
    }

    & .pa-mobile-nav-button {
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0;
      display: none;
      height: 3rem;

      & svg {
        fill: var(--pa-maroon);
        width: 3rem;
      }

      @media (max-width: 64em) {
        display: block;
      }
    }

    & .pa-navigation-list {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 2rem;

      @media (max-width: 64em) {
        display: none;
      }
      
      & a {
        color: var(--pa-maroon);
        text-decoration: none;
        text-transform: uppercase;
        font-size: clamp(1.6rem, 1vw + 1rem, 2.4rem);
        letter-spacing: -.1rem;

        &:hover {
          text-decoration: underline;
        }

        &.active--exact  {
          text-decoration: underline;
        }
      }
    }
  }
}

.overlay {
  display: none;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1000000000000000000;

  .overlay-content {
    height: 100%;
    overflow: scroll;
  }
  
  .overlay-background {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &.show {
    display: block;
    @media (min-width: 64em) {
      display: none;
    }
  }
}

.pa-navigation-list-mobile-container {

  position: relative;
  top: 0;
  right: 0;
  height: 36rem;
  width: 100%;
  margin-right: 2rem;
  background-color: var(--pa-white);
  padding: 0;

  z-index: 1000;

  & .pa-navigation-list-mobile {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    & li a {
      font-size: 3rem;
      letter-spacing: -.1rem;
      text-decoration: none;
      color: var(--pa-maroon);
      
      &.active--exact  {
        text-decoration: underline;
      }
    }
  }

  & .pa-navigation-mobile-background {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
  }

  @media (min-width: 64em) {
    display: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-400px);
  height: 0;
}

</style>