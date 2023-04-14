<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(crumb, index) in breadcrumb" :key="index">{{
        crumb
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumb: [],
    };
  },
  mounted() {
    this.setBreadcrumb();
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    },
  },
  methods: {
    setBreadcrumb() {
      const matched = this.$route.matched;
      const len = matched.length;
      console.log(len);
      const breadcrumb = [];
      for (let i = 0; i < len; i++) {
        breadcrumb.push(matched[i].meta.title);
        console.log(breadcrumb);
      }
      this.breadcrumb = breadcrumb;
    },
  },
};
</script>
