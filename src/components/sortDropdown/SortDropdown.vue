<template>
  <section class="sort-dropdown">
    <b-dropdown
      :scrollable="isScrollable"
      :max-height="maxHeight"
      v-model="currentMenu"
      aria-role="list"
    >
      <template #trigger>
        <b-button type="is-text" :icon-right="active ? 'menu-up' : 'menu-down'"
          >Sort</b-button
        >
      </template>

      <b-dropdown-item
        v-for="(menu, index) in menus"
        :key="index"
        :value="menu"
        aria-role="listitem"
      >
        <div class="media">
          <b-icon class="media-left" :icon="menu.icon"></b-icon>
          <div class="media-content">
            <h3>{{ menu.text }}</h3>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>

    <!-- <b-dropdown :paddingless="true">
      <template #trigger="{ active }">
        <b-button type="is-text" :icon-right="active ? 'menu-up' : 'menu-down'"
          >Sort</b-button
        >
      </template>

      <b-dropdown-item>Action</b-dropdown-item>
      <b-dropdown-item>Another action</b-dropdown-item>
      <b-dropdown-item>Something else</b-dropdown-item>
    </b-dropdown> -->
  </section>
</template>

<script>
export default {
  name: "SortDropdown",
  props: {
    msg: String,
  },
  data() {
    return {
      isScrollable: false,
      maxHeight: 200,
      currentMenu: { icon: "account-group", text: "People" },
      menus: [
        { icon: "account-group", text: "People" },
        { icon: "shopping-search", text: "Orders" },
        { icon: "credit-card-multiple", text: "Payments" },
        { icon: "dolly", text: "Logistics" },
        { icon: "clock-check", text: "Jobs" },
        { icon: "cart-arrow-right", text: "Cart" },
        { icon: "settings", text: "Configuration" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.sort-dropdown {
  button {
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
  }
  .dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    ::v-deep {
      .dropdown-menu {
        right: 0;
        left: unset;
      }
      .dropdown-trigger {
        display: flex;
        button {
          font-size: 1.4rem;
        }
      }
      h3 {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
