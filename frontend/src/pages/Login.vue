<template>
  <div
    class="q-pa-md"
    style="margin: 100px; max-width: 80%; text-align: center;"
  >
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="email"
        label="Email *"
        hint="Enter  your email"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Password"
        lazy-rules
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
    <br />
    <q-btn to="/register" color="secondary"> Register</q-btn>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      this.$q.loading.show();
      this.$router.push("/");
      console.log("hello");
      Axios.post("user/maketoken", {
        email: this.email,
        password: this.password
      }).then(res => {
        this.$q.loading.hide();

        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          this.$router.push("/");
          this.timer = setTimeout(() => {
            location.reload();
            this.timer = void 0;
          }, 800);
        } else {
          this.$q.notify({
            message: res.data.msg
          });
          this.clearForms();
        }
      });
    },
    clearForms() {
      this.username = "";
      this.password = "";
    }
  }
};
</script>

<style></style>
