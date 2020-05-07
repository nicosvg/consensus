<template>
  <div>
    <ElectionsList />
  </div>
</template>

<script>
// @ is an alias to /src
import ElectionsList from "@/components/ElectionsList";

export default {
  name: "Elections",
  components: {
    ElectionsList
  }
};
</script>
