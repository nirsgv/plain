<template>
  <section class="sort-dropdown">
    <label for="sort-dropdown" class="sort-label"  @click="openDropdown">Sort By:</label>
    <b-dropdown
      :scrollable="isScrollable"
      :max-height="maxHeight"
      v-model="currentMenu"
      aria-role="list"
      ref="dropdown"
      @change="(sortOption) => setSortBy({ sortBy: sortOption.id })"
    >
      <template #trigger="{ active }">
        <b-button type="is-text" :icon-right="active ? 'menu-up' : 'menu-down'">
          {{ currentMenu ? currentMenu.text : '' }}
        </b-button>
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
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "SortDropdown",
  props: {
    msg: String,
  },
  data() {
    return {
      isScrollable: false,
      maxHeight: 200,
      currentMenu: { icon: "account-group", text: "Position" },
      menus: [
        { icon: "account-group", text: "Position", id: "position" },
        { icon: "account-group", text: "Created", id: "created" },
        { icon: "shopping-search", text: "Edited", id: "edited" },
        { icon: "credit-card-multiple", text: "Subtasks", id: "subtasks" },
      ],
    };
  },
  computed: {
    ...mapGetters("tasksStore", ["sortBy"]),

    sortByValue: {
      get() {
        return this.sortBy;
      },
      set(value) {
        this.setSortBy(value);
      },
    },
  },
  methods: {
    ...mapActions("tasksStore", ["setSortBy"]),
    toggleDropdown() {
      this.dropdownActive = !this.dropdownActive;
    },
    openDropdown() {
      this.$refs.dropdown.isActive = true;
    },
  },
};
</script>

<style scoped lang="scss">
.sort-label {
  font-size: 1.4rem;
}
.sort-dropdown {
  display: flex;
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
