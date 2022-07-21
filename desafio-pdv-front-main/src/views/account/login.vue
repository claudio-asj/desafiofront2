<script>
import Layout from "@/layout/auth";
import appConfig from "@/app.config";
import {mapGetters, mapActions} from 'vuex'

import { required } from "vuelidate/lib/validators";

/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
  },
  mounted() {
    this.changeLayoutDefault(false)
  },
  beforeDestroy() {
    //this.changeLayoutDefault(true)
  },
  data() {
    return {
      email: null,
      password: null,
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  validations: {
    email: {
      required,
      // email,
    },
    password: {
      required,
    },
  },
  computed: {
    ...mapGetters({}),
    //...mapState("authfack", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },

    btnLoginVariant() {
      let variant = "primary";
      if (this.$v.$invalid) {
        variant = "outline-secondary";
      }
      return variant;
    },
  },
  methods: {
    ...mapActions({
      signIn: 'signIn',
      changeLayoutDefault: 'changeLayoutDefault',
      changeMenuCollapsed: "changeMenuCollapsed",
    }),

    // Try to log the user in with the username
    // and password they provided.
    async tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        this.tryingToLogIn = true;
        var bodyFormData = new URLSearchParams();
        bodyFormData.append("username", this.email);
        bodyFormData.append("password", this.password);
        bodyFormData.append("grant_type", "password");
        bodyFormData.append("url", process.env.VUE_APP_AUTH_API);
        bodyFormData.append("realm", process.env.VUE_APP_AUTH_REALM);
        bodyFormData.append(
          "client_id",
          process.env.VUE_APP_AUTH_CLIENT_ID
        );

        await this.signIn(bodyFormData)
          .then(() => {
            this.changeLayoutDefault(true)
            this.$router.push("/").catch(() => {});
          })
          .catch(() => {
            this.isAuthError = true;
            this.authError = "Erro na autenticação!";
          });
        this.tryingToLogIn = false;
      }
    },

    setFocusBackground(event) {
      const oldFocus = document.getElementsByClassName("active-item");
      if (oldFocus.length > 0) {
        oldFocus[0].classList.remove("active-item");
      }
      const elem = document.getElementById(event.target.id);
      elem.classList.add("active-item");
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft-primary">
            <div class="row">
              <div class="col-7 align-self-start">
                <img
                  src="@/assets/images/bagarote/logo_bagarote.svg"
                  alt
                  class="img-fluid p-4"
                />
              </div>
              <div
                class="
                  text-primary
                  col
                  align-self-end
                  d-flex
                  flex-row-reverse
                  fadeIn
                  mr-2
                  mb-1
                "
              >
                PDV
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div class="col">
              <div v-if="tryingToLogIn" class="text-primary pt-4 pb-4">
                <div class="spinner-border" role="status">
                </div>
              </div>

              <div v-else class="text-primary pt-4">
                <h5 class="text-primary">Bem Vindo(a) de Volta !</h5>
                <p>Faça login para continuar</p>
              </div>
            </div>
            <b-alert
              v-model="isAuthError"
              variant="danger"
              class="mt-3"
              dismissible
              >{{ authError }}</b-alert
            >

            <!-- <div
              v-if="notification.message"
              :class="'alert ' + notification.type"
            >
              {{ notification.message }}
            </div> -->

            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <b-form-group
                id="input-group-1"
                label="Usuário"
                label-for="input-1"
              >
                <b-form-input
                  @focus.native="setFocusBackground"
                  id="input-1"
                  v-model="email"
                  type="text"
                  :class="{ 'is-invalid': submitted && $v.email.$error }"
                ></b-form-input>
                <div
                  v-if="submitted && $v.email.$error"
                  class="invalid-feedback"
                >
                  <span v-if="!$v.email.required">Email is required.</span>
                  <span v-if="!$v.email.email">Please enter valid email.</span>
                </div>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Senha"
                label-for="input-2"
              >
                <b-form-input
                  @focus.native="setFocusBackground"
                  id="input-2"
                  v-model="password"
                  type="password"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.password.required"
                  class="invalid-feedback"
                >
                  Password is required.
                </div>
              </b-form-group>
              <div class="mt-3">
                <b-button
                  :disabled="$v.$invalid"
                  type="submit"
                  :variant="btnLoginVariant"
                  class="btn-block"
                  >Entrar</b-button
                >
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            © {{ new Date().getFullYear() }} Bagarote - Soluções em e-commerce
          </p>
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style scoped>
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.active-item {
  background: #e5e4e2;
}
.fadeIn {
  -webkit-animation: fadeIn 3s ease-in-out;
  -moz-animation: fadeIn 3s ease-in-out;
  -o-animation: fadeIn 3s ease-in-out;
  animation: fadeIn 3s ease-in-out;
}
</style>
