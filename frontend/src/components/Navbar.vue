<template>
  <div class="pa-navbar">
    <div class="overlay" :class="navigationPanelVisible ? 'show' : ''">
      <div class="pa-navigation-list-mobile-container overlay-content">
        <ul class="pa-navigation-list-mobile">
          <li><a href="/bar-restaurant">Bar/restaurant</a></li>
          <li><a href="/flexwerken">Werken</a></li>
          <li><a href="/membership">Membership</a></li>
          <li><a href="#">Community</a></li>
          <li><a href="#">Ruimte huren</a></li>
          <li><a href="#">Over ons</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div class="overlay-background" @click="navigationPanelVisible = false"></div>
    </div>
    <div class="logo-holder">
      <div class="logo-left-holder">
        <a href="/">
          <img src="../assets/PLAN_A_Logo_1_onderdeel_1.svg" alt="">
        </a>
      </div>
      <div class="pa-logo-border"></div>
      <div class="logo-right-holder">
        <a href="/">
          <img src="../assets/PLAN_A_Logo_1_onderdeel_3.svg" alt="">
        </a>
      </div>
    </div>
      
    <nav class="pa-navigation">
      <ul class="pa-navigation-list">
        <li><a href="/bar-restaurant">Bar/restaurant</a></li>
        <li><a href="/flexwerken">Werken</a></li>
        <li><a href="/membership">Membership</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">Ruimte huren</a></li>
        <li><a href="#">Over ons</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <button class="pa-mobile-nav-button" @click="navigationPanelVisible = !navigationPanelVisible">
        <svg viewBox="0 0 341.333 341.333" width="40" height="40">
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
}

.logo-left-holder {
  min-width: 8rem;
  height: 5rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index:100000;
  margin-top: .1rem;

  & img {
    height: 3.2rem;
  }
}

.logo-right-holder {
  min-width: 7rem;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  z-index:100000;
  margin-top: .1rem;

  & img {
    height: 3.2rem;
  }
}

.pa-navbar {
  
  & .pa-logo-border {
    height: 5rem;
    width: 100%;
    border-bottom: 5px solid var(--pa-red);
    background-color: var(--pa-white);
  }

  & .pa-navigation {
    margin: 5rem 7rem 0 8rem;
    padding: 1rem 0;

    display: flex;
    justify-content: flex-end;

    & .pa-mobile-nav-button {
      border: none;
      background: transparent;
      cursor: pointer;

      margin-right: -3rem;

      display: none;

      & svg {
        fill: var(--pa-maroon);
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
        font-weight: 700;
        font-size: 2.2rem;

        &:hover {
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
  z-index: 10;

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

  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70vw;
  background-color: var(--pa-white);
  padding: 5rem;

  z-index: 1000;

  


  & .pa-navigation-list-mobile {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    & li a {
      font-size: 3rem;
      text-decoration: none;
      color: var(--pa-maroon);
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
}

</style>