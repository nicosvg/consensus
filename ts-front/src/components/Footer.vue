<template>
  <div class="footer">
    <div>Web application under construction</div>
    <div>Thumbs icon from <a href="https://icons8.com">icons8.com</a></div>
    <div>
      ©2020 <a href="http://nicosauvage.fr">Nicolas Sauvage</a> -
      <a href="https://gitlab.com/Noki/consensus">Source code</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primary);
  color: var(--text-light);
  /*width: 100%;*/
  padding: 32px 32px;
}

.footer div {
  margin-bottom: 16px;
}
</style>
