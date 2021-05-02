<template>
  <div class="q-pa-md" style="text-align: center;">
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
        v-model="username"
        label="Username*"
        hint="Enter  your username"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="password"
        type="password"
        label="Password"
        hint="Enter your password"
        lazy-rules
        :rules="[
          val => val.length >= 10 || 'Please use minimum 10 characters',
          val =>
            validatePw(val) ||
            'Please use uppercase letter, lowercase letter and a digit'
        ]"
      />
      <q-input
        filled
        v-model="confirmpassword"
        type="password"
        label="Confirm password"
        hint="Confirm password"
        lazy-rules
        :rules="[val => val == password || '']"
      />
      <q-btn color="primary" type="submit" label="Create Account" />
    </q-form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmpassword: ""
    };
  },
  methods: {
    validatePw(pw) {
      let regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,28}$/;
      return regex.test(pw);
    },
    onSubmit() {
      Axios.post("/user/create", {
        username,
        email,
        password: confirmpassword
      });
    }
  }
};
</script>

<style></style>
